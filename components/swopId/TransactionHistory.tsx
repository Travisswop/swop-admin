import Image from "next/image";
import React from "react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

const TransactionHistoryData = [
  {
    transaction_id: "0x3rffsdghdf54....56hgj",
    date: "Jun 22, 2021",
    type: "Sent",
    asset: "AAVE",
    asset_img: "/images/user/eth.png",
    amount: "582.38",
    value_usd: "$8735.79",
  },
  {
    transaction_id: "0x3rffsdghdf54....56hgj",
    date: "Jun 22, 2021",
    type: "Received",
    asset: "USDC",
    asset_img: "/images/user/eth.png",
    amount: "582.38",
    value_usd: "$8735.79",
  },
  {
    transaction_id: "0x3rffsdghdf54....56hgj",
    date: "Jun 22, 2021",
    type: "Sent",
    asset: "AAVE",
    asset_img: "/images/user/eth.png",
    amount: "582.38",
    value_usd: "$8735.79",
  },
  {
    transaction_id: "0x3rffsdghdf54....56hgj",
    date: "Jun 22, 2021",
    type: "Received",
    asset: "DAI",
    asset_img: "/images/user/eth.png",
    amount: "582.38",
    value_usd: "$8735.79",
  },
  {
    transaction_id: "0x3rffsdghdf54....56hgj",
    date: "Jun 22, 2021",
    type: "Sent",
    asset: "AAVE",
    asset_img: "/images/user/eth.png",
    amount: "582.38",
    value_usd: "$8735.79",
  },
  {
    transaction_id: "0x3rffsdghdf54....56hgj",
    date: "Jun 22, 2021",
    type: "Received",
    asset: "USDC",
    asset_img: "/images/user/eth.png",
    amount: "582.38",
    value_usd: "$8735.79",
  },
];

const TransactionHistory = () => {
  return (
    <div className=" px-6 py-4 2xl:px-8 2xl:py-5 rounded-lg bg-white shadow-[0px_2px_16px_rgba(0,0,0,0.15)]">
      {TransactionHistoryData.map((transaction, index) => (
        <div
          key={index}
          className={`flex items-center justify-between py-4 ${
            index !== TransactionHistoryData.length - 1 ? "border-b" : ""
          }`}
        >
          {/* Left Section: Icon and Details */}
          <div className="flex items-center justify-center">
            <div className="w-12 2xl:w-14 h-12 2xl:h-14 rounded-full bg-black flex items-center justify-center mr-3 relative">
              <span className="text-white text-xl 2xl:text-2xl">
                {transaction.type === "Sent" ? (
                  <GoArrowUpRight />
                ) : (
                  <GoArrowDownLeft />
                )}
              </span>
              <div>
                <Image
                  src={transaction?.asset_img}
                  alt={transaction?.asset}
                  width={24}
                  height={24}
                  className="absolute right-0 bottom-0 w-4 2xl:w-5"
                ></Image>
              </div>
            </div>
            <div>
              <p className="text-base 2xl:text-lg font-semibold text-black">
                {transaction.transaction_id}
              </p>
              <p className="text-sm 2xl:text-base text-[#808080]">
                {transaction.date}
              </p>
            </div>
          </div>

          {/* Right Section: Amount and USD Value */}
          <div className="text-right">
            <p className="text-base 2xl:text-lg font-semibold text-black">
              {transaction.amount} {transaction.asset}
            </p>
            <p className="text-sm 2xl:text-base text-[#808080]">
              {transaction.value_usd}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
