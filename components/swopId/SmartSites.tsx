import { getUserLists } from "@/action/swopId";
import { Microsite } from "@/types/user";
import Image from "next/image";
import React from "react";
import isUrl from "../util/isUrl";

const SmartSites = async ({
  token,
  individualId,
}: {
  token: string;
  individualId: string;
}) => {
  console.log("microsites token: ", token);
  console.log("microsites individualId: ", individualId);

  const userLists = await getUserLists(token || "", 1, 1, individualId);

  // console.log("userLists tttt", userLists);

  return (
    <div className=" p-8 rounded-lg bg-white shadow-[0px_2px_16px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-4 gap-4">
        {userLists.data.microsites.map((sites: Microsite, index: number) => (
          <div
            key={index}
            className={`px-3 py-3 2xl:px-4 2xl:py-4  border rounded-xl overflow-hidden ${
              sites.theme && "flex flex-col gap-2 justify-center"
            }`}
          >
            {!sites.theme ? (
              <div className="border-2 rounded-lg border-white shadow-lg relative p-1">
                <Image
                  src={`/images/smartsite-banner/${sites.backgroundImg}.png`}
                  alt={sites?.name + " smartsite cover image"}
                  width={300}
                  height={120}
                  className="w-full rounded-lg"
                />
                <div className="absolute w-full  -bottom-12">
                  <Image
                    src={
                      isUrl(sites.profilePic)
                        ? sites.profilePic
                        : `/images/user_avator/${sites.profilePic}@3x.png`
                    }
                    alt={sites?.name}
                    width={90}
                    height={90}
                    className="border-2 border-white mx-auto rounded-full bg-white w-20 2xl:w-[90px] "
                  />
                </div>
              </div>
            ) : (
              <Image
                src={
                  isUrl(sites.profilePic)
                    ? sites.profilePic
                    : `/images/user_avator/${sites.profilePic}@3x.png`
                }
                alt={sites?.name}
                width={90}
                height={90}
                className="border-2 border-white mx-auto rounded-full bg-white w-20 2xl:w-[90px] "
              />
            )}

            <div className={`${!sites.theme ? "mt-14" : "mt-2"} `}>
              <h4 className="text-center text-xl font-semibold">
                {sites?.name}
              </h4>
              <p className="text-center text-[#686B74] text-base">
                {sites?.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSites;
