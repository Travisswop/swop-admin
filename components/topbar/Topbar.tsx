"use client";

// import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import UserMenu from "./TopbarDropdown";
import LanguageMenu from "./TopbarLanguageDropdown";
// import logo from "@/public/logo.png";

export default function Topbar() {
  //   const router = useRouter();
  //   const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  //   if (loading) {
  //     return (
  //       <header className="bg-white p-6 flex justify-between items-center h-20 border-b">
  //         <Link href="/dashboard" className="h-20">
  //           <Image src={logo} alt="Logo" width={120} height={50} />
  //         </Link>
  //         <Skeleton className="h-14 w-48 rounded-full" />
  //       </header>
  //     );
  //   }

  return (
    <header className="sticky top-0 z-30 h-20  border-b bg-white px-4 pl-64 flex items-center justify-between w-full">
      <p className="text-2xl font-bold text-black pl-6">Dashboard</p>
      <div className="flex items-center gap-6">
        <div className="w-96 relative">
          <input
            type="text"
            className="px-3 py-2 bg-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
            placeholder="Search here..."
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
        </div>
        <LanguageMenu />
      </div>
      <UserMenu />
    </header>
  );
}
