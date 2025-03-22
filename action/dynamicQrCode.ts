"use server";

export async function getDynamicQrCode(
  token: string,
  page: number,
  limit: number,
  search: string = ""
) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
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
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching QR code details:", error);
    return { success: false, message: "Failed to fetch QR code details." };
  }
}

export async function createDynamicQrCode(
  micrositeId: string,
  qrCodeName: string,
  qrcodeUrl: string,
  redirectMicrosite: string,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dynamicQRCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          micrositeId,
          qrCodeName,
          qrcodeUrl,
          redirectMicrosite,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating dynamic QR code:", error);
    return { success: false, message: "Failed to create dynamic QR code." };
  }
}

export async function updateDynamicQrCode(
  dynamicQRCodeId: string,
  qrcodeUrl: string,
  redirectMicrosite: string,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dynamicQRCode`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dynamicQRCodeId, qrcodeUrl, redirectMicrosite }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating dynamic QR code:", error);
    return { success: false, message: "Failed to update dynamic QR code." };
  }
}
