"use server";

export async function getOrderLists(
  token: string,
  currentPage: number,
  limit: number,
  search: string = "",
  sort: string,
  filterType: string = "all"
) {
  try {
    console.log("Fetching order lists with params:", sort);

    const params = new URLSearchParams({
      currentPage: currentPage.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(sort && { sort }),
      ...(filterType && { filterType }),
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/v1/admin/orders?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("check order list", response.status);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order lists:", error);
    return { success: false, message: "Failed to fetch orders." };
  }
}

export async function getOrderDetailsById(token: string, id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/order/${id}`,
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
    console.error("Error fetching order details:", error);
    return { success: false, message: "Failed to fetch order details." };
  }
}
