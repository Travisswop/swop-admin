"use client";
import CustomTable from "@/components/CustomTable";
import ReferralPath from "@/components/referral/ReferralPath";
// import Path from "@/components/subscribe/Path";
// import { usePathname } from "next/navigation";
import React from "react";

//imported data for table
import data from "@/lib/placeholderData";

const Page = () => {
  //   const path = usePathname();
  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      <ReferralPath />
      <CustomTable
        sideText="Referrals"
        dynamicData={data}
        showSearch={true}
        // clickPath={path}
        referrals={true}
      />
    </section>
  );
};

export default Page;
