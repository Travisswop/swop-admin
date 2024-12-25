import CustomTable from "@/components/CustomTable";
import Path from "@/components/subscribe/Path";
import React from "react";

//imported data for table
import data from "@/lib/placeholderData";
const page = () => {
  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      <Path />
      <CustomTable sideText="" dynamicData={data} showSearch={true} />
    </section>
  );
};

export default page;
