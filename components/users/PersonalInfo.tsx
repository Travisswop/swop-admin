"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

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
      <section>
        <Card className=" drop-shadow-[0px_5px_5px_rgba(0,0,0,0.20)]  h-full p-5 border-0 rounded-2xl ">
          <CardHeader className="p-2 text-black text-2xl float-left w-full border-b">
            Personal Information
          </CardHeader>
          <CardContent className=" py-4  w-fit grid grid-cols-2 gap-5 ">
            <h4>Email:</h4>
            <h4 className="text-black flex justify-between items-center">
              {selectedSite?.email}
              <span className="text-[#737791] cursor-pointer hover:text-[#BD80FF]">
                <FaEdit />
              </span>
            </h4>
            <h4>Phone:</h4>
            <h4 className="text-black">+ {selectedSite?.phone}</h4>
            <h4>Referral Code:</h4>
            <h4 className="text-black text-nowrap">
              {selectedSite?.referrals}
            </h4>
            <h4>Sign Up Date:</h4>
            <h4 className="text-black">{selectedSite?.signUpDate}</h4>
            <h4>Date Of Birth:</h4>
            <h4 className="text-black">{user.dateOfBirth}</h4>
            <h4>Premium Subscriber?</h4>

            {/* <Switch checked={selectedSite?.premiumMembership} /> */}
            <Switch />
            <h4>Public Solana Address:</h4>
            <h4 className="text-black">{selectedSite?.solana}</h4>
            <h4>Public EVM Address:</h4>
            <h4 className="text-black">{selectedSite?.solana.slice(8, -1)}</h4>
            <h4>Associated NFC Serial No:</h4>
            <h4 className="text-black">{selectedSite?.nfc}</h4>
            <h4>Swop.ID:</h4>
            <h4 className="text-black">{selectedSite?.swopId}</h4>
            <h4>Balance:</h4>
            <h4 className="text-black">$ {selectedSite?.balance}</h4>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className=" drop-shadow-[0px_5px_5px_rgba(0,0,0,0.20)] border-0 h-full p-5 rounded-2xl">
          <CardHeader className="p-2 text-black text-2xl float-left w-full border-b">
            Shipping
          </CardHeader>
          <CardContent className=" py-4 w-fit grid grid-cols-2 gap-5">
            <h4>Address 1:</h4>
            <h4 className="text-black">{selectedSite?.address1}</h4>
            <h4>Address 2:</h4>
            <h4 className="text-black">{selectedSite?.address2}</h4>
            <h4>City:</h4>
            <h4 className="text-black">{selectedSite?.city}</h4>
            <h4>Zipcode:</h4>
            <h4 className="text-black">{selectedSite?.zip}</h4>
            <h4>State/Providence:</h4>
            <h4 className="text-black">{selectedSite?.state}</h4>
            <h4>Country:</h4>
            <h4 className="text-black">{selectedSite?.country}</h4>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PersonalInfo;
