import { Button } from "@/components/ui/button";
import React from "react";

const pointsData = [
  {
    id: 1,
    point_type: "Followers",
    min_point: 1,
    max_point: 1,
  },
  { id: 2, point_type: "Leads", min_point: 1, max_point: 1 },
  { id: 3, point_type: "Posts", min_point: 1, max_point: 1 },
  {
    id: 4,
    point_type: "Reposts",
    min_point: 1,
    max_point: 1,
  },
  {
    id: 5,
    point_type: "Signing up",
    min_point: 1,
    max_point: 1,
  },
  {
    id: 6,
    point_type: "Premium Subscription",
    min_point: 1,
    max_point: 1,
  },
  {
    id: 7,
    point_type: "Programming NFC",
    min_point: 1,
    max_point: 1,
  },
];

const page = () => {
  const middleIndex = Math.ceil(pointsData.length / 2);
  const firstHalf = pointsData.slice(0, middleIndex);
  const secondHalf = pointsData.slice(middleIndex);

  return (
    <div className="p-8 xl:p-10 text-black bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Max Points Limits</h2>
      </div>
      <div className="flex justify-between items-start gap-10 xl:gap-14">
        {/* First Half */}
        <div className="w-1/2">
          <div className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200">
            <p>Name</p> <p className="max-w-60 w-full text-center">Points</p>
          </div>
          <div>
            {firstHalf.map((point) => (
              <div
                key={point.id}
                className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
              >
                <h5 className="text-lg font-medium">{point.point_type}</h5>
                <div className="grid gap-6 mb-6 md:grid-cols-2 max-w-60 w-full">
                  <div>
                    <label
                      htmlFor={`min_point_${point.id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Min
                    </label>
                    <input
                      type="text"
                      id={`min_point_${point.id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      placeholder={point.min_point.toString()}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`max_point_${point.id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Max
                    </label>
                    <input
                      type="text"
                      id={`max_point_${point.id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      placeholder={point.max_point.toString()}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Half */}
        <div className="w-1/2">
          <div className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200">
            <p>Name</p> <p className="max-w-60 w-full text-center">Points</p>
          </div>
          <div>
            {secondHalf.map((point) => (
              <div
                key={point.id}
                className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
              >
                <h5 className="text-lg font-medium">{point.point_type}</h5>
                <div className="grid gap-6 mb-6 md:grid-cols-2 max-w-60 w-full">
                  <div>
                    <label
                      htmlFor={`min_point_${point.id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Min
                    </label>
                    <input
                      type="text"
                      id={`min_point_${point.id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      placeholder={point.min_point.toString()}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`max_point_${point.id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Max
                    </label>
                    <input
                      type="text"
                      id={`max_point_${point.id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      placeholder={point.max_point.toString()}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-10">
        <Button
          variant={"default"}
          className="max-w-32 w-full  text-black bg-white border border-black hover:text-white"
        >
          Cancel
        </Button>
        <Button variant={"default"} className="max-w-32 w-full">
          Save
        </Button>
      </div>
    </div>
  );
};

export default page;
