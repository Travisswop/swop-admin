"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const slug = [
  {
    slug: "/subscribers",
    name: "Subscribers",
  },
  {
    slug: "/subscribers/enterprise-leads",
    name: "Enterprise leads",
  },
  {
    slug: "/subscribers/demos",
    name: "Demos",
  },
];

const Path = () => {
  const path = usePathname();
  console.log("Path", path);

  return (
    <section className=" max-w-[315px] h-20 mr-auto ">
      <div className=" flex justify-start items-center gap-8 w-fit z-20">
        {slug.map((item) => (
          <Link
            key={item.slug}
            href={item.slug}
            className={`${
              path === item.slug
                ? "border-b-2 border-black font-medium text-black z-20"
                : ""
            }
        `}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-b-2 border-[#737791] -translate-y-0.5 -z-10"></div>
    </section>
  );
};

export default Path;
