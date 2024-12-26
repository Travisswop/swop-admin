// "use client";
// import { deleteQrCode } from "@/actions/customQrCode";
// import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
// import DeleteQRCode from "@/components/DeleteQRCode";
import PrimaryButton from "@/components/button/PrimaryButton";
import QrCodeLists from "@/components/qrCodeManagement/QrCodeLists";
// import QrCodeLists from "@/components/QrCodeLists";
// import DeleteQRCode from "@/components/smartsite/qrCode/DeleteQRCode";
// import ShareCustomQRCode from "@/components/smartsite/socialShare/ShareCustomQRCode";
// import ShareCustomQRCode from "@/components/ShareModal/ShareCustomQRCode";
// import { getFormattedDate } from "@/components/util/getFormattedDate";
// import { cookies } from "next/headers";
// import TestShare from "@/components/TestShare";
// import { getFormattedDate } from "@/util/getFormattedDate";
// import { Checkbox, Switch } from "@nextui-org/react";
// import Image from "next/image";
// import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { FiDownload } from "react-icons/fi";
// import { CiSearch } from "react-icons/ci";
import { IoQrCodeSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
// import { MdDeleteForever } from "react-icons/md";
// import { TbEdit } from "react-icons/tb";

const QrCodePage = async () => {
  //   const cookieStore = cookies();

  // Retrieve data from specific cookie
  //   const accessToken = (await cookieStore).get("access-token")?.value;
  //   const userId = (await cookieStore).get("user-id")?.value;

  //   if (accessToken && userId) {
  if (true) {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user/customQRCodes/${userId}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     next: { revalidate: 300 },
    //   }
    // );

    // const data = await response.json();

    // const handleDelete = async (id: string) => {
    //   const data = await deleteQrCode(id, session.accessToken);
    //   console.log("data delete", data);
    // };

    return (
      <div className="main-container pb-6 relative text-black bg-white py-6 px-5">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-10">
            <p className="text-gray-700 font-semibold text-lg ">QR Codes</p>
            <div>
              {/* <Link href={"/qr-code/create"}> */}
              <PrimaryButton className="flex items-center gap-1 !py-1.5 text-sm">
                <IoQrCodeSharp />
                Create
              </PrimaryButton>
              {/* </Link> */}
            </div>
          </div>
          <div className="flex items-center gap-4 mr-28">
            <div className="w-60 2xl:w-72 relative">
              <input
                type="text"
                className="px-3 py-1 border border-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
                placeholder="Search..."
              />
              <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            </div>
            <button className="bg-[#EAEAEA] px-4 py-1 flex items-center gap-1 rounded-md">
              <MdDateRange color="gray" className="-translate-y-[2px]" />
              <p className="text-sm font-medium">All Time</p>
              <p className="text-xs text-gray-400">June 13, 2024</p>
            </button>
          </div>
        </div>
        {/* <table className="w-full"> */}
        {/* {data.data.length > 0 && (
          <QrCodeLists data={data?.data} accessToken={accessToken} />
        )} */}
        <QrCodeLists />
        {/* </table> */}
        {/* {data.data.length === 0 && (
          <div className="flex justify-center pt-10">
            <p className="font-medium mb-6 text-gray-600">
              No QR Code Available!
            </p>
          </div>
        )} */}
      </div>
    );
  }
};

export default QrCodePage;
