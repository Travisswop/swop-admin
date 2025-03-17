"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PointsList } from "@/types/points";
import { updateCampaignPointsList } from "@/action/points";
import { TbTopologyStar3 } from "react-icons/tb";
import { toast } from "react-toastify";

const PointsUpdate = ({
  firstHalf,
  secondHalf,
  token,
}: {
  firstHalf: PointsList[];
  secondHalf: PointsList[];
  token: string;
}) => {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handlePointsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateLoading(true);
    const formData = new FormData(e.currentTarget);

    const pointsList = [...firstHalf, ...secondHalf].map((point) => ({
      title: point.title,
      pointValue: point.pointValue, // Assuming this value is static or fetched elsewhere
      minPoints: Number(formData.get(`min_point_${point._id}`)) || 0,
      maxPoints: Number(formData.get(`max_point_${point._id}`)) || null,
      isActive: true, // Modify this if needed
    }));

    const payload = { pointsList };

    console.log("payload", payload);

    try {
      const response = await updateCampaignPointsList(payload, token);
      console.log("response", response);

      if (response.success) {
        toast.success("Updated Successfully!");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      console.error("Error updating points list:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Something Went Wrong!";
      toast.error(errorMessage);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <form onSubmit={handlePointsUpdate}>
      <div className="flex justify-between items-start gap-10 xl:gap-14">
        {/* First Half */}
        <div className="w-1/2">
          <div className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200">
            <p>Name</p> <p className="max-w-60 w-full text-center">Points</p>
          </div>
          <div>
            {firstHalf.map((point: PointsList) => (
              <div
                key={point._id}
                className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
              >
                <h5 className="text-lg font-medium">{point.title}</h5>
                <div className="grid gap-6 mb-6 md:grid-cols-2 max-w-60 w-full">
                  <div>
                    <label
                      htmlFor={`min_point_${point._id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Min
                    </label>
                    <input
                      type="text"
                      id={`min_point_${point._id}`}
                      name={`min_point_${point._id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      // placeholder={point.min_point.toString()}
                      defaultValue={point.minPoints}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`max_point_${point._id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Max
                    </label>
                    <input
                      type="text"
                      id={`max_point_${point._id}`}
                      name={`max_point_${point._id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      // placeholder={point.max_point.toString()}
                      defaultValue={point.maxPoints ? point.maxPoints : "null"}
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
            {secondHalf.map((point: PointsList) => (
              <div
                key={point._id}
                className="flex justify-between items-center gap-5 pb-3 mb-4 border-b border-gray-200"
              >
                <h5 className="text-lg font-medium">{point.title}</h5>
                <div className="grid gap-6 mb-6 md:grid-cols-2 max-w-60 w-full">
                  <div>
                    <label
                      htmlFor={`min_point_${point._id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Min
                    </label>
                    <input
                      type="text"
                      id={`min_point_${point._id}`}
                      name={`min_point_${point._id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      // placeholder={point.min_point.toString()}
                      defaultValue={point.minPoints}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`max_point_${point._id}`}
                      className="block mb-2 text-sm font-normal text-gray-400 text-center"
                    >
                      Max
                    </label>
                    <input
                      type="text"
                      id={`max_point_${point._id}`}
                      name={`max_point_${point._id}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-center text-center"
                      // placeholder={point.max_point.toString()}
                      defaultValue={point.maxPoints ? point.maxPoints : "null"}
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
          type="button"
          className="max-w-32 w-full  text-black bg-white border border-black hover:text-white"
        >
          Cancel
        </Button>
        <Button type="submit" variant={"default"} className="max-w-32 w-full">
          {isUpdateLoading ? (
            <TbTopologyStar3 className="animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PointsUpdate;
