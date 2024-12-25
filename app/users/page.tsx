"use client";
import CustomTable from "@/components/CustomTable";
import { usePathname } from "next/navigation";
import React from "react";

//imported data for table
import data from "@/lib/placeholderData";

const Page = () => {
  const path = usePathname();
  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      <CustomTable
        sideText=""
        dynamicData={data}
        showSearch={false}
        clickAble={true}
        clickPath={path}
        user={true}
      />
    </section>
  );
};

export default Page;
