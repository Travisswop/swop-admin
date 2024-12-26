import React from "react";
import IndividualUserInformation from "./IndividualUserInformation";
import TransactionHistory from "./TransactionHistory";
import SmartSites from "./SmartSites";

const IndividualUser = () => {
  return (
    <div className="p-10 bg-white  text-black">
      <div className="grid grid-cols-2  gap-8 w-full mb-10">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-black mb-4">
            User Information
          </h3>
          <IndividualUserInformation />
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
