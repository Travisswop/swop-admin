"use server";

export async function getOrderLists(
  token: string,
  page: number = 1,
  limit: number = 10,
  search: string = "",
  startDate: string = "",
  endDate: string = "",
  sort: string = "createdAt:desc"
) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(sort && { sort }),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/orders?${queryParams}`,
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
    console.error("Error fetching order lists:", error);
    return { success: false, message: "Failed to fetch orders." };
  }
}
