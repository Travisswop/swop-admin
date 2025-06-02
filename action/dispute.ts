"use server";

import { DisputeDetailsResponse, Pagination } from "@/types/dispute";

interface ApiSuccessResponse {
  success: true;
  data: {
    data: DisputeDetailsResponse[]; // Your disputes array
  };
  pagination: Pagination;
  message?: never;
}

export async function getDisputesList(token: string) {
  if (!token) {
    console.error("Authorization token is missing.");
    return { success: false, message: "Authorization token is required." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v5/admin/disputes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = `API Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching disputes list:", error);
    return { success: false, message: "Failed to fetch disputes." };
  }
}

export async function getDisputesDetailsById(token: string, disputeId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v5/admin/disputes/${disputeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching dispute details:", error);
    return { success: false, message: "Failed to fetch dispute details." };
  }
}
