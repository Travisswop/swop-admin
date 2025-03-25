"use server";

export async function getAllMicrosites(
  token: string,
  searchValue: string = ""
) {
  try {
    // Build URL with optional search query
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/microsites`
    );
    if (searchValue) {
      url.searchParams.append("search", searchValue);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("Error fetching microsites:", error);
    return {
      success: false,
      message: error || "Failed to fetch microsites.",
      data: [],
    };
  }
}
