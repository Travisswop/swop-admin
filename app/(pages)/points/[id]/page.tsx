import { getUserPoints } from "@/action/points";
// import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
// import Link from "next/link";
import * as React from "react";

interface IPoints {
  pointType: string;
  totalPoints: number;
}

const UserPointDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const token = (await cookies()).get("authToken")?.value;
  const { id } = await params;

  const points = await getUserPoints(id, token || "");

  const middleIndex = Math.ceil(points.aggregatedPoints.length / 2);
  const firstHalf = points.aggregatedPoints.slice(0, middleIndex);
  const secondHalf = points.aggregatedPoints.slice(middleIndex);

  return (
    <div className="p-8 xl:p-10 text-black bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Reward earnings rate</h2>
        {/* <Link href={`/points/edit/update-points`}>
          <Button variant={"default"}>Edit Points</Button>
        </Link> */}
      </div>
      {points.success ? (
        <div className="flex justify-between items-start gap-10 xl:gap-14">
          {/* First Half */}
          <div className="w-1/2">
            <div className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200 text-gray-500">
              <p>Name</p> <p className="max-w-60 w-full text-center">Points</p>
            </div>
            <div>
              {firstHalf.map((point: IPoints, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
                >
                  <h5 className="text-lg font-medium">{point.pointType}</h5>
                  <div className="max-w-60 w-full text-center">
                    <p>{point.totalPoints}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Last Half */}
          <div className="w-1/2">
            <div className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200 text-gray-500">
              <p>Name</p> <p className="max-w-60 w-full text-center">Points</p>
            </div>
            <div>
              {secondHalf.map((point: IPoints, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
                >
                  <h5 className="text-lg font-medium">{point.pointType}</h5>
                  <div className="max-w-60 w-full text-center">
                    <p>{point.totalPoints}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>{points.message}</p>
      )}
    </div>
  );
};

export default UserPointDetails;
