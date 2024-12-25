import React from "react";
import connectionMap from "@/public/images/connection_map.png";
import randomImg from "@/public/images/user/random.png";
import salmanImg from "@/public/images/user/salman.png";
import travisImg from "@/public/images/user/travis.png";
import Image from "next/image";
import PrimaryButton from "@/components/button/PrimaryButton";
import { FaUserPlus } from "react-icons/fa";

const ConnectionsMap = () => {
  return (
    <div className="text-black bg-white py-5 px-8">
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h4 className="text-lg font-medium mb-4">Map</h4>
            <Image src={connectionMap} alt="connection map" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium">Spotlight</h4>
              <PrimaryButton className="flex items-center gap-1 bg-white border border-black hover:border-gray-500 !text-black hover:!text-white !py-1.5 text-sm">
                <FaUserPlus />
                Add New
              </PrimaryButton>
            </div>
            <div className="py-3 px-5 rounded-lg border">
              <div className="">
                <div className="flex w-full items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Image
                      src={randomImg}
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Kamal Shekh</p>
                      <p className="text-gray-400 text-xs">General Manager</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Uttara, Dhaka</p>
                  <button style={{ color: "red" }} className="text-sm">
                    Remove
                  </button>
                </div>
              </div>
              <div className="">
                <div className="flex w-full items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Image
                      src={salmanImg}
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Salman H. Saikote</p>
                      <p className="text-gray-400 text-xs">CTO Of Swop</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Aftabnagar, Dhaka</p>
                  <button style={{ color: "red" }} className="text-sm">
                    Remove
                  </button>
                </div>
              </div>
              <div className="">
                <div className="flex w-full items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={travisImg}
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Travis Herron</p>
                      <p className="text-gray-400 text-xs">CEO Of Swop</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Charlotte, NC</p>
                  <button style={{ color: "red" }} className="text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-medium">Default Connections</h4>
            <PrimaryButton className="flex items-center gap-1 bg-white border border-black hover:border-gray-500 !text-black hover:!text-white !py-1.5 text-sm">
              <FaUserPlus />
              Add New
            </PrimaryButton>
          </div>
          <div className="py-3 px-5 rounded-lg border">
            <div className="">
              <div className="flex w-full items-center justify-between py-3 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src={randomImg}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Kamal Shekh</p>
                    <p className="text-gray-400 text-xs">General Manager</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Uttara, Dhaka</p>
                <button style={{ color: "red" }} className="text-sm">
                  Remove
                </button>
              </div>
            </div>
            <div className="">
              <div className="flex w-full items-center justify-between py-3 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src={salmanImg}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Salman H. Saikote</p>
                    <p className="text-gray-400 text-xs">CTO Of Swop</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Aftabnagar, Dhaka</p>
                <button style={{ color: "red" }} className="text-sm">
                  Remove
                </button>
              </div>
            </div>
            <div className="">
              <div className="flex w-full items-center justify-between py-3 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src={randomImg}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Kamal Shekh</p>
                    <p className="text-gray-400 text-xs">General Manager</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Uttara, Dhaka</p>
                <button style={{ color: "red" }} className="text-sm">
                  Remove
                </button>
              </div>
            </div>
            <div className="">
              <div className="flex w-full items-center justify-between py-3 border-b">
                <div className="flex items-center gap-2">
                  <Image
                    src={salmanImg}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Salman H. Saikote</p>
                    <p className="text-gray-400 text-xs">CTO Of Swop</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Aftabnagar, Dhaka</p>
                <button style={{ color: "red" }} className="text-sm">
                  Remove
                </button>
              </div>
            </div>
            <div className="">
              <div className="flex w-full items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={travisImg}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Travis Herron</p>
                    <p className="text-gray-400 text-xs">CEO Of Swop</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Charlotte, NC</p>
                <button style={{ color: "red" }} className="text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsMap;
