"use client";
import { User } from "@/types/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import isUrl from "../util/isUrl";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const IndividualUserInformation = ({ data }: { data: User }) => {
  console.log("individual user", data);
  const swopId = data.microsites.find(
    (item) => item._id === data.primaryMicrosite
  )?.ens;
  const [premiumSubscriber, setPremiumSubscriber] = useState("basic");

  useEffect(() => {
    if (data.isPremiumUser) {
      setPremiumSubscriber("pro");
    } else {
      setPremiumSubscriber("basic");
    }
  }, [data.isPremiumUser]);

  return (
    <div className="p-6 2xl:p-8 rounded-lg bg-white shadow-[0px_2px_16px_rgba(0,0,0,0.15)]">
      <div className="user-card">
        <div className=" flex gap-4 items-center pb-5 border-b mb-5">
          <Image
            src={
              isUrl(data.profilePic)
                ? data.profilePic
                : `/images/user_avator/${data.profilePic}@3x.png`
            }
            alt={`${data.name}`}
            width={80}
            height={80}
            className="border-2 border-white shadow-md rounded-full"
          />
          <div>
            <h2 className="text-xl 2xl:text-2xl font-semibold text-black mb-1">
              {data?.name}
            </h2>
            <p className="text-base text-[#686B74] font-normal">{swopId}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-[#424651] mb-1 w-48">Bio:</p>
          <p className="text-[#686B74] text-base font-normal">{data.bio}</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">Address:</p>
          <p className="text-[#686B74] text-base font-normal">{data.address}</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">Phone:</p>
          <p className="text-[#686B74] text-base font-normal">
            {data.mobileNo}
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">Email:</p>
          <p className="text-[#686B74] text-base font-normal">{data.email}</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Referral Code:
          </p>
          <p className="text-[#686B74] text-base font-normal">
            {data.referralCode}
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">Points:</p>
          <p className="text-[#686B74] text-base font-normal">{"N/A"}</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Joining Date:
          </p>
          <p className="text-[#686B74] text-base font-normal">
            {data.createdAt}
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Date Of Birth:
          </p>
          <p className="text-[#686B74] text-base font-normal">{data.dob}</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Premium Subscriber?
          </p>
          <div className="text-[#686B74] text-base font-normal">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={premiumSubscriber}
                row
              >
                <FormControlLabel
                  value="basic"
                  disabled={premiumSubscriber !== "basic"}
                  control={<Radio />}
                  label="Basic"
                />
                <FormControlLabel
                  value="pro"
                  disabled={premiumSubscriber !== "pro"}
                  control={<Radio />}
                  label="Pro"
                />
                <FormControlLabel
                  value="premium"
                  disabled={premiumSubscriber !== "premium"}
                  control={<Radio />}
                  label="Premium"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Public Ethereum Address:
          </p>
          <p className="text-[#686B74] text-base font-normal">
            {data.walletData?.wallet.ethAddress}
          </p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Public Solana Address:
          </p>
          <p className="text-[#686B74] text-base font-normal">
            {data.walletData?.wallet.solAddress}
          </p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">
            Associated NFC Serial No:
          </p>
          <p className="text-[#686B74] text-base font-normal">N/A</p>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-[#424651] mb-1 w-48">Balance:</p>
          <p className="text-[#686B74] text-base font-normal">N/A</p>
        </div>
      </div>
    </div>
  );
};

export default IndividualUserInformation;
