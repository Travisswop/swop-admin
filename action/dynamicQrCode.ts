"use server";

import { revalidateTag } from "next/cache";

export async function getDynamicQrCode(
  token: string,
  currentPage: number,
  limit: number,
  search: string = ""
) {
  try {
    const params = new URLSearchParams({
      currentPage: currentPage.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v1/admin/dynamicQRCode?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["qrCodeCreate", "qrCodeUpdate"] },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching QR code details:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return { success: false, message: "Failed to fetch QR code details." };
  }
}

// CREATE Dynamic QR Code
export async function createDynamicQrCode(
  micrositeId: string,
  qrCodeName: string,
  qrcodeUrl: string,
  redirectMicrosite: string,
  micrositeName: string,
  token: string
) {
  console.log("Creating dynamic QR code with data:",
    redirectMicrosite,
  );
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dynamicQRCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          micrositeId,
          qrCodeName,
          qrcodeUrl,
          redirectMicrosite,
          micrositeName,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `API Error: ${response.status}`);
    }

    const data = await response.json();

    // Revalidate cache after creation
    revalidateTag("qrCodeCreate");

    return { success: true, data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating dynamic QR code:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return { success: false, message: "Failed to create dynamic QR code." };
  }
}

// UPDATE Dynamic QR Code
export async function updateDynamicQrCode(
  dynamicQRCodeId: string,
  qrcodeUrl: string,
  redirectMicrosite: string,
  micrositeName: string,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dynamicQRCode`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dynamicQRCodeId,
          qrcodeUrl,
          redirectMicrosite,
          micrositeName,
        }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `API Error: ${response.status}`);
    }

    const data = await response.json();

    // Revalidate cache after update
    revalidateTag("qrCodeUpdate");

    return { success: true, data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating dynamic QR code:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return { success: false, message: "Failed to update dynamic QR code." };
  }
}
