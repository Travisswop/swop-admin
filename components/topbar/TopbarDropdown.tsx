"use client";

import userImage from "@/public/images/user_image.jpg";
import Image from "next/image";
import { useState } from "react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-1.5 border border-[#57b6ffa7] rounded-xl  transition-all"
      >
        <Image
          alt="user image"
          src={userImage}
          className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
        />
        <p className="text-gray-800 font-medium">Travis Herron</p>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-1 text-gray-800">
            <li
              onClick={handleClose}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </li>
            <li
              onClick={handleClose}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              My Account
            </li>
            <li
              onClick={handleClose}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
