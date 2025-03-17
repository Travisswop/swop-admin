"use client";

import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface DateFilterDropdownProps {
  handleSortChange: (value: string) => void;
}

export default function DateFilterDropdown({
  handleSortChange,
}: DateFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Date");

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Correct function: update selectedOption + call parent's handleSortChange
  const handleSelect = (option: string, label: string) => {
    handleSortChange(option); // Call parent function
    setSelectedOption(label); // Update the displayed label
    setIsOpen(false); // Close dropdown
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white px-3 py-2 transition-all border-2 border-gray-200 rounded-lg w-28 justify-center"
      >
        <p className="text-gray-500 font-medium capitalize">{selectedOption}</p>
        <FaAngleDown
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1 text-gray-800">
            <li
              onClick={() => handleSelect("date", "Latest")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Latest
            </li>
            <li
              onClick={() => handleSelect("date", "Oldest")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Oldest
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
