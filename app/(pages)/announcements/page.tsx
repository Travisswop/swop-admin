import React from "react";
import astro from "@/public/images/Astro.png";
import Image from "next/image";
import PrimaryButton from "@/components/button/PrimaryButton";
import { TbCameraPlus } from "react-icons/tb";

const AnnouncementsPage = () => {
  return (
    <div className="text-black bg-white p-6">
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <Image src={astro} alt="astro logo" className="w-12 h-auto" />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Swop biggest giveway</p>
            <p className="w-1/2 text-gray-600 text-xs">
              Swop’s Flat Rectangle NFC’s are designed to be durable and simple
              to use. The Flat is great to put under any phone case(non-metal).
            </p>
          </div>
        </div>
        <PrimaryButton className="w-[11rem] flex items-center justify-center">
          Send everyone
        </PrimaryButton>
      </div>
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <Image src={astro} alt="astro logo" className="w-12 h-auto" />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Swop biggest giveway</p>
            <p className="w-1/2 text-gray-600 text-xs">
              Swop’s Flat Rectangle NFC’s are designed to be durable and simple
              to use. The Flat is great to put under any phone case(non-metal).
            </p>
          </div>
        </div>
        <PrimaryButton className="w-[11rem] flex items-center justify-center">
          Send everyone
        </PrimaryButton>
      </div>
      <div className="flex justify-between items-center py-3 border-b">
        <div className="flex items-center gap-3">
          <Image src={astro} alt="astro logo" className="w-12 h-auto" />
          <div className="flex flex-col gap-1">
            <p className="font-bold">Swop biggest giveway</p>
            <p className="w-1/2 text-gray-600 text-xs">
              Swop’s Flat Rectangle NFC’s are designed to be durable and simple
              to use. The Flat is great to put under any phone case(non-metal).
            </p>
          </div>
        </div>
        <PrimaryButton className="w-[11rem] flex items-center justify-center">
          Send everyone
        </PrimaryButton>
      </div>
      <div className="flex justify-between items-end py-3 border-b">
        <div className="flex gap-3">
          <button>
            <div className="border border-dashed p-4 rounded-lg">
              <div className="bg-[#D4D4D4] px-4 py-6 rounded-lg">
                <TbCameraPlus
                  size={26}
                  className="mx-auto mb-2 text-[#5C5C5C]"
                />
                <p className="text-sm text-gray-600">Select album cover</p>
              </div>
            </div>
          </button>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <div>
                <p className="font-medium">Header:</p>
                <input
                  type="text"
                  placeholder="Input text here"
                  className="focus:outline-none py-2 border px-3 w-64 2xl:w-72"
                />
              </div>
              <div>
                <p className="font-medium">Subtext:</p>
                <input
                  type="text"
                  placeholder="Input text here"
                  className="focus:outline-none py-2 border px-3 w-64 2xl:w-72"
                />
              </div>
            </div>
            <div>
              <p className="font-medium">Link:</p>
              <input
                type="text"
                placeholder="Input text here"
                className="focus:outline-none py-2 border px-3 w-64 2xl:w-72"
              />
            </div>
          </div>
        </div>
        <PrimaryButton>Save</PrimaryButton>
      </div>
      <PrimaryButton className="mt-3 px-16">Add</PrimaryButton>
    </div>
  );
};

export default AnnouncementsPage;
