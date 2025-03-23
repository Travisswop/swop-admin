"use client";

import { getAllMicrosites } from "@/action/microsites";
import { useCallback, useEffect, useRef, useState } from "react";

interface Microsite {
  _id: string;
  parentId: {
    name: string | null;
    bio: string | null;
  } | null;
}

interface Props {
  token: string;
  childId: string;
  setChildId: (id: string) => void;
}

const MicrositeSearchInputField = ({ token, childId, setChildId }: Props) => {
  const [micrositeFetchLoading, setMicrositeFetchLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedName, setSelectedName] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMicrosites = useCallback(
    async (query: string) => {
      if (query.trim() === "") {
        setMicrosites([]);
        setShowDropdown(false);
        return;
      }

      try {
        setMicrositeFetchLoading(true);
        const response = await getAllMicrosites(token, query);
        if (response?.data?.length > 0) {
          setMicrosites(response.data);
          setShowDropdown(true);
        } else {
          setMicrosites([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching microsites:", error);
        setMicrosites([]);
        setShowDropdown(false);
      } finally {
        setMicrositeFetchLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (searchValue.trim() === "" || selectedName) {
      // Prevent search if already selected
      setMicrosites([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      fetchMicrosites(searchValue);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchValue, fetchMicrosites, selectedName]);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSelectMicrosite = (site: Microsite) => {
    setChildId(site._id);
    setSelectedName(site?.parentId?.name || ""); // Save selected name
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(""); // Reset selected state
    setSearchValue(e.target.value);
  };

  console.log("", childId);

  return (
    <div>
      <div className="my-4">
        <label
          htmlFor="name-icon"
          className="block mb-2 text-lg font-normal text-gray-900"
        >
          Microsite<span className="text-primary">*</span>
        </label>

        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search Microsites..."
            value={selectedName || searchValue} // Show selected name if selected
            onChange={handleInputChange}
            className="bg-[#ffffff] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 active:border-primary outline-none max-w-lg"
          />
          {micrositeFetchLoading && (
            <div className="absolute right-2 top-2 text-base">
              <span className="loader" /> Loading...
            </div>
          )}
          {showDropdown && microsites.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute bg-white shadow-lg w-full max-h-64 overflow-y-auto rounded z-50 mt-1"
            >
              {microsites.map((site) => (
                <button
                  key={site._id}
                  className="text-left p-2 border-b hover:bg-gray-100 w-full"
                  onClick={() => handleSelectMicrosite(site)}
                >
                  <h3>{site?.parentId?.name || ""}</h3>
                  <p className="text-sm italic text-gray-600">
                    {site?.parentId?.bio || ""}
                  </p>
                </button>
              ))}
            </div>
          )}
          {showDropdown &&
            !micrositeFetchLoading &&
            microsites.length === 0 && (
              <div className="absolute bg-white shadow-lg w-full rounded p-2 text-gray-500">
                No microsite found
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MicrositeSearchInputField;
