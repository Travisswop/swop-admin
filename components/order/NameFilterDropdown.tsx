"use client";

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface NameFilterDropdownProps {
  handleDateChange: (value: string) => void;
}

export default function NameFilterDropdown({
  handleDateChange,
}: NameFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("ascending");

  // Toggles the dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handles selection from the dropdown
  const handleSelect = (lang: string) => {
    setLanguage(lang); // Updates the displayed language
    setIsOpen(false); // Closes the dropdown after selection
    handleDateChange(lang); // Calls the parent function whenever the selection changes
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
              onClick={() => handleSelect("ascending")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Ascending
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
