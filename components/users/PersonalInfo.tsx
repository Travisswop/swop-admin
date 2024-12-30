"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";

import { Row } from "@/lib/placeholderData";
import { Switch } from "../ui/switch";
import { FaEdit } from "react-icons/fa";

const PersonalInfo = ({
  user,
  selectedSwopId,
}: {
  user: Row;
  selectedSwopId: string;
}) => {
  const selectedSite = user.site.find((site) => site.id === selectedSwopId);

  return (
    <div className="w-full h-full grid grid-cols-2 gap-5">
      <h2 className="col-span-2 text-black text-2xl float-left w-full">
        Personal Information
      </h2>
      <section>
        <Card className="bg-[#f7f7f7] h-fit p-5">
          <CardContent className="pr-72 py-4  w-full grid grid-cols-2 gap-5">
            <h4>Email:</h4>
            <h4 className="text-black flex justify-between items-center">
              {selectedSite?.email}
              <span className="text-[#737791] cursor-pointer hover:text-[#BD80FF]">
                <FaEdit />
              </span>
            </h4>
            <h4>Phone:</h4>
            <h4 className="text-black">{selectedSite?.phone}</h4>
            <h4>Referral Code:</h4>
            <h4 className="text-black">{selectedSite?.referrals}</h4>
            <h4>Sign Up Date:</h4>
            <h4 className="text-black">{selectedSite?.signUpDate}</h4>
            <h4>Date Of Birth:</h4>
            <h4 className="text-black">{user.dateOfBirth}</h4>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="bg-[#f7f7f7]  h-fit p-5 ">
          <CardContent className="pr-44 py-4 w-full grid grid-cols-2 gap-5">
            <h4>Premium Subscriber?</h4>

            <Switch checked={selectedSite?.premiumMembership} />

            <h4>Public Solana Address:</h4>
            <h4 className="text-black">{selectedSite?.solana}</h4>
            <h4>Associated NFC Serial No:</h4>
            <h4 className="text-black">{selectedSite?.nfc}</h4>
            <h4>Swop.ID:</h4>
            <h4 className="text-black">{selectedSite?.swopId}</h4>
            <h4>Balance:</h4>
            <h4 className="text-black">{selectedSite?.balance}</h4>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PersonalInfo;
