"use client";

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function NameFilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("asecending");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white px-3 py-2 transition-all border-2 border-gray-200 rounded-lg w-36 justify-center"
      >
        <p className="text-gray-500 font-medium capitalize">{language}</p>
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
              onClick={() => handleSelect("asecending")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Asecending
            </li>
            <li
              onClick={() => handleSelect("descending")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Descending
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
