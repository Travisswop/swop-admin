"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// const slug = [
//   {
//     slug: "/subscribers",
//     name: "Subscribers",
//   },
//   {
//     slug: "/enterprise-leads",
//     name: "Enterprise leads",
//   },
//   {
//     slug: "/subscribers/demos",
//     name: "Demos",
//   },
// ];

const Path = () => {
  const path = usePathname();
  const route = useRouter();
  //console.log("Path", path);

  const handleChange = (checked: boolean) => {
    if (checked) {
      route.push("/enterprise-leads");
    } else {
      route.push("/subscribers");
    }
  };

  return (
    <section className=" max-w-[350px] h-20 mr-auto ">
      <div className=" flex justify-start items-center gap-5 w-fit z-20">
        <Link
          href={"/subscribers"}
          className={cn(
            "text-black z-20",
            path === "/subscribers" ? "font-medium " : ""
          )}
        >
          Subscribers
        </Link>

        <FormControlLabel
          control={
            <Switch
              defaultChecked={path === "/enterprise-leads"}
              onChange={(e) => {
                handleChange(e.target.checked);
              }}
              sx={{
                color: "#737791",
                "&.Mui-checked": {
                  color: "#737791",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#737791",
                },
                "& .MuiSwitch-thumb": {
                  color: "#737791",
                },
              }}
            />
          }
          label=""
        />

        <Link
          href={"/enterprise-leads"}
          className={cn(
            "text-black z-20 -translate-x-7",
            path === "/enterprise-leads" ? "font-medium " : ""
          )}
        >
          Enterprise leads
        </Link>
      </div>
    </section>
  );
};

//old design

{
  /* <section className=" max-w-[315px] h-20 mr-auto ">
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
    </section> */
}

//old design

export default Path;
