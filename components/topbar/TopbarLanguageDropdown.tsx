"use client";

import americanFlag from "@/public/images/american_flag.webp";
import bangladeshFlag from "@/public/images/bangladesh_flag.png";
import Image from "next/image";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function LanguageMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("eng");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white px-3 py-2 transition-all"
      >
        <Image
          alt="flag"
          src={language === "eng" ? americanFlag : bangladeshFlag}
          className="w-6 h-6 rounded-full"
        />
        <p className="text-gray-800 font-medium">
          {language === "eng" ? "Eng (US)" : "Bangla"}
        </p>
        <FaAngleDown
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1 text-gray-800">
            <li
              onClick={() => handleSelect("eng")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Eng (US)
            </li>
            {/* <li
              onClick={() => handleSelect("bangla")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Bangla
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
}
