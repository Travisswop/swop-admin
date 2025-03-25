import { getPointsLists } from "@/action/swopId";
import PointsLists from "@/components/points/PointsLists";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PointsPage = async ({ searchParams }: PageProps) => {
  const token = (await cookies()).get("authToken")?.value;
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 10;
  const pointLists = await getPointsLists(token || "", page, limit);
  console.log("points lists", pointLists);
  return (
    <div className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg py-10">
      <article className="flex justify-between items-center w-full gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl 2xl:text-2xl font-semibold pl-5">
            User Points
          </h2>
          <Link href={`/points/edit/update-points`}>
            <Button variant={"default"}>Edit Points</Button>
          </Link>
        </div>
        <div className="w-96 relative">
          <input
            type="text"
            className="px-3 py-2 bg-[#F1F8FF] rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
            placeholder="Search here..."
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
        </div>
      </article>
      <PointsLists pointLists={pointLists} />
    </div>
  );
};

export default PointsPage;
