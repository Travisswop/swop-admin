import Image from "next/image";
import React from "react";

const IndividualUserData = [
  {
    profile_picture: "/images/user/hamid.png",
    name: "Hamid Hasan",
    swopple_id: "Hamid.Swopple.ID",
    profession: "Inspector",
    bio: "As an Inspector, I bring a keen eye for detail and a commitment to justice. My experience has taught me the importance of diligence, integrity, and perseverance in every investigation I undertake.",
    address: "3605 Parker Rd.",
    number: "(684) 555-0102",
    email: "hamid628@gmail.com",
    wallet_address: "0xB4Fh3466...67Xd",
  },
];

const IndividualUserInformation = () => {
  return (
    <div className="p-6 2xl:p-8 rounded-lg bg-white shadow-[0px_2px_16px_rgba(0,0,0,0.15)]">
      {IndividualUserData.map((user, index) => (
        <div key={index} className="user-card">
          <div className=" flex gap-4 items-center pb-5 border-b mb-5">
            <Image
              src={user?.profile_picture}
              alt={`${user?.name}'s profile`}
              width={80}
              height={80}
              className="border-2 border-white shadow-md rounded-full"
            />
            <div>
              <h2 className="text-xl 2xl:text-2xl font-semibold text-black mb-1">
                {user?.name}
              </h2>
              <p className="text-base text-[#686B74] font-normal">
                {user?.swopple_id}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold text-[#424651] mb-1">Bio</p>
            <p className="text-[#686B74] text-base font-normal">{user?.bio}</p>
          </div>
          <div className="mb-4 ">
            <p className="text-lg font-semibold text-[#424651] mb-1">
              Address:
            </p>
            <p className="text-[#686B74] text-base font-normal">
              {user?.address}
            </p>
          </div>
          <div className="mb-4 ">
            <p className="text-lg font-semibold text-[#424651] mb-1">Phone:</p>
            <p className="text-[#686B74] text-base font-normal">
              {user?.number}
            </p>
          </div>
          <div className="mb-4 ">
            <p className="text-lg font-semibold text-[#424651] mb-1">Email:</p>
            <p className="text-[#686B74] text-base font-normal">
              {user?.email}
            </p>
          </div>
          <div className=" ">
            <p className="text-lg font-semibold text-[#424651] mb-1">
              Wallet Address:
            </p>
            <p className="text-[#686B74] text-base font-normal">
              {user?.wallet_address}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndividualUserInformation;
