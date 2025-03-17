"use server";

// Define TypeScript interfaces
type Point = {
  title: string;
  pointValue: number;
  minPoints?: number;
  maxPoints?: number | null;
  isActive?: boolean;
};

type UpdatePointsRequest = {
  pointsList: Point[];
};

export async function getCampaignPoints(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/points/campaign`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}

export async function updateCampaignPointsList(
  payload: UpdatePointsRequest,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/points/campaign/updatePointList`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error from action:", error);
  }
}
