"use client";

import { logout } from "@/action/logout";
import userImage from "@/public/images/user_image.jpg";
import { IUser } from "@/types/user";
import Image from "next/image";
import { useState, useRef, useEffect } from "react"; // Import useRef and useEffect

export default function UserMenu({ userInfo }: { userInfo: IUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener when the dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Re-run effect when `isOpen` changes

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-1.5 border border-[#57b6ffa7] rounded-xl transition-all"
      >
        <Image
          alt="user image"
          src={userInfo.profilePic || userImage}
          width={200}
          height={200}
          quality={100}
          className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
        />
        <p className="text-gray-800 font-medium">{userInfo.name}</p>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-1 text-gray-800">
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
