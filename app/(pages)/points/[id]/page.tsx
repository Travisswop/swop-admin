"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";

const pointsData = [
  {
    id: 1,
    point_type: "Followers",
    min_point: 1,
    max_point: 1,
    color: "#0095FF",
  },
  { id: 2, point_type: "Leads", min_point: 1, max_point: 1, color: "#00C39A" },
  { id: 3, point_type: "Posts", min_point: 1, max_point: 1, color: "#A259FF" },
  {
    id: 4,
    point_type: "Reposts",
    min_point: 1,
    max_point: 1,
    color: "#FF9800",
  },
  {
    id: 5,
    point_type: "Signing up",
    min_point: 1,
    max_point: 1,
    color: "#0095FF",
  },
  {
    id: 6,
    point_type: "Premium Subscription",
    min_point: 1,
    max_point: 1,
    color: "#00C39A",
  },
  {
    id: 7,
    point_type: "Programming NFC",
    min_point: 1,
    max_point: 1,
    color: "#A259FF",
  },
];

const page = () => {
  const middleIndex = Math.ceil(pointsData.length / 2);
  const firstHalf = pointsData.slice(0, middleIndex);
  const secondHalf = pointsData.slice(middleIndex);

  return (
    <div className="p-8 xl:p-10 text-black bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Reward earnings rate</h2>
        <Link href={`/points/edit/${pointsData[0].id}`}>
          <Button variant={"default"}>Edit Points</Button>
        </Link>
      </div>
      <div className="flex justify-between items-start gap-10 xl:gap-14">
        {/* First Half */}
        <div className="w-1/2">
          <div className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200 text-gray-500">
            <p>Name</p> <p className="max-w-60 w-full text-center">Points</p>
          </div>
          <div>
            {firstHalf.map((point) => (
              <div
                key={point.id}
                className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
              >
                <h5 className="text-lg font-medium">{point.point_type}</h5>
                <div className="max-w-60 w-full text-center">
                  <p>10</p>
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
            {secondHalf.map((point) => (
              <div
                key={point.id}
                className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
              >
                <h5 className="text-lg font-medium">{point.point_type}</h5>
                <div className="max-w-60 w-full text-center">
                  <p>10</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
