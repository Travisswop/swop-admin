import Image from "next/image";
import React from "react";

const smartSitesData = [
  {
    cover_photo: "/images/user/cover-1.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-2.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-3.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-4.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-5.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-6.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-7.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
  {
    cover_photo: "/images/user/cover-8.png",
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    profession: "Inspector",
  },
];

const SmartSites = () => {
  return (
    <div className=" p-8 rounded-lg bg-white shadow-[0px_2px_16px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-4 gap-4">
        {smartSitesData.map((sites, index) => (
          <div
            key={index}
            className="px-3 py-3 2xl:px-4 2xl:py-4  border rounded-xl overflow-hidden"
          >
            <div className="border-2 rounded-lg border-white shadow-lg relative">
              <Image
                src={sites?.cover_photo}
                alt={sites?.name + "smartsite cover image"}
                width={300}
                height={120}
                className="w-full"
              />
              <div className="absolute w-full  -bottom-12">
                <Image
                  src={sites?.profile_picture}
                  alt={sites?.name}
                  width={90}
                  height={90}
                  className="border-2 border-white mx-auto rounded-full bg-white w-20 2xl:w-[90px] "
                ></Image>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="text-center text-xl font-semibold">
                {sites?.name}
              </h4>
              <p className="text-center text-[#686B74] text-base">
                {sites?.profession}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSites;
