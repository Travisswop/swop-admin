"use server";

import { Announcements } from "@/types/Announcements";
import { revalidateTag } from "next/cache";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Announcements[];
}

export async function getAnnouncements(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/announcements`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["createAnnouncements"],
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
      data: result.data as Announcements[],
    };
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return {
      success: false,
      message: "Failed to fetch announcements.",
      data: [] as Announcements[],
    };
  }
}

export async function createAnnouncements(
  header: string,
  link: string,
  subtext: string,
  image: string,
  status: boolean,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/announcements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          header,
          link,
          subtext,
          image,
          status,
        }),
      }
    );

    revalidateTag("createAnnouncements");

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
      message: data.message || "Announcements create successfully",
      data: data.data || null,
    };
  } catch (error) {
    console.error("Error adding default announcements:", error);
    return {
      success: false,
      message: error || "Failed to add announcements",
      data: null,
    };
  }
}
