"use client";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import swopLogo from "@/public/images/swop-logo.png";
// import { useState } from "react";
import { LuLayoutGrid, LuMapPinned } from "react-icons/lu";
import { HiOutlineLogout, HiUsers } from "react-icons/hi";
import { GrAnnounce } from "react-icons/gr";
import { RiSendToBack } from "react-icons/ri";
import { LiaIdCard } from "react-icons/lia";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const navItems = [
  { href: "/", label: "Dashboard", icon: <LuLayoutGrid /> },
  { href: "/users", label: "Users", icon: <HiUsers /> },
  { href: "/announcements", label: "Announcements", icon: <GrAnnounce /> },
  { href: "/referral", label: "Referral", icon: <RiSendToBack /> },
  { href: "/connections-map", label: "Connections Map", icon: <LuMapPinned /> },
  { href: "/swop-id", label: "Swop.ID", icon: <LiaIdCard /> },
  { href: "/jobs", label: "Jobs", icon: <IoBagHandleOutline /> },
  { href: "/subscribers", label: "Subscribers", icon: <FaUsers /> },
  {
    href: "/qr-management",
    label: "QR management",
    icon: <MdOutlineQrCodeScanner />,
  },
];

export default function Sidebar() {
  //   const [hideUpgradePlan, setHideUpgradePlan] = useState(true);
  //   const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  //   const router = useRouter();

  //   const handleLogout = async () => {
  //     // Prevent multiple logout attempts
  //     if (isLoggingOut) {
  //       console.log("Logout already in progress");
  //       return;
  //     }

  //     setIsLoggingOut(true);
  //     try {
  //       // Clear user data first to prevent any state inconsistencies
  //       clearCache();

  //       // Perform logout and navigation in parallel for better performance
  //       await Promise.all([logout(), router.replace("/login")]);
  //     } catch (error) {
  //       console.error("Logout failed:", error);
  //       // Revert loading state on error
  //       setIsLoggingOut(false);
  //       throw error; // Re-throw to allow error handling by parent components
  //     }
  //     // Only clear loading state on success to prevent UI flicker
  //     setIsLoggingOut(false);
  //   };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white overflow-x-hidden">
      <div className="flex h-full flex-col">
        <div className="flex h-[89px] items-center justify-center px-4 mt-4">
          <Link href="/" className="h-full flex justify-center items-center">
            <div className="w-[6.5rem] h-auto">
              <Image src={swopLogo} quality={100} alt="SWOP" />
            </div>
          </Link>
        </div>
        <div className="h-full flex flex-col overflow-y-auto justify-between">
          <nav className={`pb-10 space-y-1 px-2`}>
            <ul className="flex-1 px-2 pb-2 space-y-2 font-normal">
              {navItems.map((item) => {
                // const Icon = item.icon;

                // Check if pathname starts with item's href
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2
                        ${
                          isActive
                            ? "bg-black hover:bg-black text-white"
                            : "hover:bg-gray-100 text-[#737791]"
                        }
                      `}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-4 text-[#737791] pb-20">
            <button
              //   onClick={handleLogout}
              className="flex items-center gap-2 mt-3 pl-2 font-medium"
            >
              <HiOutlineLogout size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
