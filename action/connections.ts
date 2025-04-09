"use server";

import { Connection } from "@/types/connections";
import { revalidateTag } from "next/cache";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Connection[]; // Connection array type used here
}

interface DeleteConnectionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function getDefaultConnection(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/connections`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["deleteDefaultConnection", "addDefaultConnection"],
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const result: ApiResponse = await response.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data as Connection[],
    };
  } catch (error: any) {
    console.error("Error fetching connections:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch connections.",
      data: [] as Connection[],
    };
  }
}

export async function deleteDefaultConnection(
  id: string,
  connectionType: string,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/connections/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          connectionType,
        }),
        next: {
          tags: ["clientDataCreate", "clientDataDelete"],
        },
      }
    );

    revalidateTag("deleteDefaultConnection");

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data: DeleteConnectionResponse = await response.json();

    return {
      success: true,
      message: "Connection deleted successfully",
      data,
    };
  } catch (error) {
    console.error("Error deleting connection:", error);
    return {
      success: false,
      message: error || "Failed to delete connection.",
    };
  }
}

export async function addDefaultConnection(
  address: string,
  lat: string,
  lng: string,
  childId: string,
  connectionType: string[],
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/connections`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          lat,
          lng,
          childId,
          connectionType,
        }),
      }
    );

    revalidateTag("addDefaultConnection");

    if (!response.ok) {
      // Try to extract backend error
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message || "Connection added successfully",
      data: data.data || null,
    };
  } catch (error) {
    console.error("Error adding default connection:", error);
    return {
      success: false,
      message: error || "Failed to add connection",
      data: null,
    };
  }
}
