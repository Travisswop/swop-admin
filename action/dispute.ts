'use server';

import {
  DisputeDetailsResponse,
  DisputeListResponse as ApiDisputeListResponse,
} from '@/types/dispute';

interface DisputeListParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

interface DisputeResolutionData {
  winner: 'seller' | 'buyer';
  resolutionType: 'seller_payout' | 'full_refund';
}

interface DisputeResolutionRequest {
  status: 'resolved';
  response: string;
  notifyUser: boolean;
  resolutionData: DisputeResolutionData;
}

export async function getDisputesList(
  token: string,
  params?: DisputeListParams
): Promise<ApiDisputeListResponse> {
  if (!token) {
    console.error('Authorization token is missing.');
    throw new Error('Authorization token is required.');
  }

  try {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (params?.page)
      queryParams.append('page', params.page.toString());
    if (params?.limit)
      queryParams.append('limit', params.limit.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/v5/admin/disputes${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // Add cache control
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorMessage = `API Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDisputesDetailsById(
  token: string,
  disputeId: string
): Promise<DisputeDetailsResponse> {
  if (!token || !disputeId) {
    throw new Error(
      'Authorization token and dispute ID are required.'
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v5/admin/disputes/${disputeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dispute details:', error);
    throw error;
  }
}

// Admin resolves dispute in favor of seller with payout
export async function resolveDisputeForSeller(
  token: string,
  disputeId: string,
  response?: string
): Promise<{
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}> {
  if (!token || !disputeId) {
    throw new Error(
      'Authorization token and dispute ID are required.'
    );
  }

  try {
    const requestBody: DisputeResolutionRequest = {
      status: 'resolved',
      response:
        response ||
        'After reviewing the evidence, we have decided in favor of the seller. Payment has been released.',
      notifyUser: true,
      resolutionData: {
        winner: 'seller',
        resolutionType: 'seller_payout',
        // payoutAmount not needed for seller_payout (uses order total with fee)
      },
    };

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v5/admin/disputes/${disputeId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!apiResponse.ok) {
      const errorMessage = `API Error: ${apiResponse.status} ${apiResponse.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error('Error resolving dispute for seller:', error);
    throw error;
  }
}

// Admin resolves dispute in favor of buyer with full refund
export async function resolveDisputeForBuyer(
  token: string,
  disputeId: string,
  response?: string
): Promise<{
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}> {
  if (!token || !disputeId) {
    throw new Error(
      'Authorization token and dispute ID are required.'
    );
  }

  try {
    const requestBody: DisputeResolutionRequest = {
      status: 'resolved',
      response:
        response ||
        'After reviewing your dispute, we have decided in your favor. A full refund has been processed.',
      notifyUser: true,
      resolutionData: {
        winner: 'buyer',
        resolutionType: 'full_refund',
        // refundAmount not needed for full_refund (uses order total)
      },
    };

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v5/admin/disputes/${disputeId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!apiResponse.ok) {
      const errorMessage = `API Error: ${apiResponse.status} ${apiResponse.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error('Error resolving dispute for buyer:', error);
    throw error;
  }
}
