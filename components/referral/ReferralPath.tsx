"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const slug = [
  {
    slug: "/referral",
    name: "Referral",
  },
  {
    slug: "/referral/top-earners",
    name: "Top earners",
  },
  {
    slug: "/referral/paid-out",
    name: "Paid out",
  },
  {
    slug: "/referral/previous-payouts",
    name: "Previous payouts",
  },
];

const ReferralPath = () => {
  const path = usePathname();
  console.log("Path", path);

  return (
    <section className="w-full pb-5  m-auto ">
      <div
        className={cn(
          "w-full flex justify-end items-center gap-8 ",
          path !== "/referral" ? "justify-between" : ""
        )}
      >
        {path !== "/referral" && (
          <button
            className={cn(
              " text-black h-full  px-4 py-1  flex justify-center items-center text-xl"
            )}
            onClick={() => {
              window.history.back();
            }}
          >
            <FaArrowLeft />
            &nbsp;&nbsp;&nbsp;<span>Go Back</span>
          </button>
        )}
        <div className=" flex justify-start items-center gap-8 w-fit ">
          {slug.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={cn(item.slug === "/referral" ? "hidden" : "")}
            >
              <button
                className={cn(
                  "bg-white text-black h-full  px-4 py-2 rounded-xl flex justify-center items-center ",
                  path === item.slug ? "text-white bg-black" : ""
                )}
              >
                <span>{item.name}</span>&nbsp;{" "}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferralPath;
