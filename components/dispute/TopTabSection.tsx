"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

const TopTabSection = () => {
  const tabItems = [
    { title: "All Disputes", slug: "allDisputes", value: "45" },
    { title: "Action Required", slug: "actionRequired", value: "24" },
    { title: "Declined", slug: "declined", value: "17" },
    { title: "Resolved", slug: "resolved", value: "5" },
  ];

  const [selected, setSelected] = useState("allDisputes");

  return (
    <div>
      <div className="flex flex-col flex-wrap gap-4 w-full">
        <div className="relative flex gap-10 border-b border-gray-300 w-full">
          {tabItems.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelected(tab?.slug)}
              className={clsx(
                "relative py-2 text-base font-medium transition-colors duration-200 flex items-center space-x-2 ",
                selected === tab?.slug
                  ? "text-gray-800 font-medium"
                  : "text-gray-400"
              )}
            >
              <p> {tab.title}</p>{" "}
              <p className="border rounded-2xl w-11">{tab.value}</p>
              {/* Animated underline */}
              {selected === tab?.slug && (
                <motion.div
                  layoutId="underline"
                  className="absolute -left-3  right-0 -bottom-1 h-[2px] bg-gray-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {/* <div className="mt-4 w-full max-w-2xl min-h-[350px]">
          {selected === "orderHistory" && <div className="">sdfdsf</div>}
          {selected === "customerDetails" && <div className="">dfd</div>}
          {selected === "sellerDetails" && <div className="">dfdsf</div>}
          {selected === "dispute" && <div className="">df</div>}
        </div> */}
      </div>
    </div>
  );
};

export default TopTabSection;
