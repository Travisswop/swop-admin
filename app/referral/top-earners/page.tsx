"use client";
import CustomTable from "@/components/CustomTable";
import ReferralPath from "@/components/referral/ReferralPath";
// import Path from "@/components/subscribe/Path";
// import { usePathname } from "next/navigation";
import React from "react";

function createData(
  id: number,
  date: string,
  name: string,
  email: string,
  payStatus: boolean,
  referrals: string,
  earned: number,
  reference: string,
  phone: string,
  bookingTime: string
) {
  return {
    id,
    date,
    name,
    reference,
    email,
    payStatus,
    referrals,
    earned,
    phone,
    bookingTime,
  };
}
type Row = {
  id: number;
  date: string;
  name: string;
  email: string;
  payStatus: boolean;
  referrals: string;
  earned: number;
  reference: string;
  phone: string;
  bookingTime: string;
};

const data = [] as Array<Row>;

for (let i = 0; i < 20; i++) {
  data.push(
    createData(
      i,
      "2016-05-24",
      "Frozen yoghurt",
      "ref@gmail",
      true,
      "referrals",
      4.0,
      "ref",
      "1234567890",
      "10:00"
    )
  );
}

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
