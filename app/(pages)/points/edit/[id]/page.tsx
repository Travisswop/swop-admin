import { getCampaignPoints } from "@/action/points";
import PointsUpdate from "@/components/points/PointsUpdate";
import { cookies } from "next/headers";
import React from "react";

const UpdatePointsPage = async () => {
  const token = (await cookies()).get("authToken")?.value;
  const points = await getCampaignPoints(token || "");
  const pointLists = points.data[0].pointsList;

  console.log("point", points);

  const middleIndex = Math.ceil(pointLists.length / 2);
  const firstHalf = pointLists.slice(0, middleIndex);
  const secondHalf = pointLists.slice(middleIndex);

  return (
    <div className="p-8 xl:p-10 text-black bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Max Points Limits</h2>
      </div>
      <PointsUpdate
        firstHalf={firstHalf}
        secondHalf={secondHalf}
        token={token || ""}
      />
    </div>
  );
};

export default UpdatePointsPage;
