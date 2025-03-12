import React from "react";
import IndividualUserInformation from "./IndividualUserInformation";
import TransactionHistory from "./TransactionHistory";
import SmartSites from "./SmartSites";
import { cookies } from "next/headers";
import { getUserLists } from "@/action/swopId";

const IndividualUser = async ({ individualId }: { individualId: string }) => {
  const token = (await cookies()).get("authToken")?.value;

  const userLists = await getUserLists(token || "", 1, 1, individualId);

  if (!userLists.success) {
    throw new Error("Failed to fetch user list");
  }

  console.log("userLists1", userLists);

  return (
    <div className="p-10 bg-white  text-black">
      <div className="grid grid-cols-2  gap-8 w-full mb-10">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-black mb-4">
            User Information
          </h3>
          <IndividualUserInformation data={userLists.data} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-black mb-4">
            Transaction History
          </h3>
          <TransactionHistory />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-black mb-4">Smartsites</h3>
        <SmartSites />
      </div>
    </div>
  );
};

export default IndividualUser;
