import Image from "next/image";
import React from "react";
import userImage from "@/public/images/random_user_image.png";
import clockImage from "@/public/images/clock.png";

function CustomerSupport() {
  return (
    <div className="bg-white rounded-lg shadow-md py-4 px-6">
      <h2 className="text-lg font-semibold mb-4">Customer Support</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Image
              alt="user image"
              src={userImage}
              quality={100}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>Rehana Alam</p>
              <p className="text-gray-400 text-sm">Business Analist</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm">14.00</p>
            <Image
              alt="clock image"
              src={clockImage}
              quality={100}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Image
              alt="user image"
              src={userImage}
              quality={100}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>Rehana Alam</p>
              <p className="text-gray-400 text-sm">Business Analist</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm">14.00</p>
            <Image
              alt="clock image"
              src={clockImage}
              quality={100}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Image
              alt="user image"
              src={userImage}
              quality={100}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>Rehana Alam</p>
              <p className="text-gray-400 text-sm">Business Analist</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm">14.00</p>
            <Image
              alt="clock image"
              src={clockImage}
              quality={100}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Image
              alt="user image"
              src={userImage}
              quality={100}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>Rehana Alam</p>
              <p className="text-gray-400 text-sm">Business Analist</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm">14.00</p>
            <Image
              alt="clock image"
              src={clockImage}
              quality={100}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport;
