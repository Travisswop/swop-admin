"use client";

import { getAllMicrosites } from "@/action/microsites";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../ui/Loader";
import isUrl from "../util/isUrl";

interface Microsite {
  _id: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  profilePic: string | null;
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
  const [searchValue, setSearchValue] = useState("");
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [miscrositeName, setMicrositeName] = useState("");
  const [miscrositeBio, setMicrositeBio] = useState("");
  const [miscrositeImage, setMicrositeImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMicrosites = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const res = await getAllMicrosites(token, query);
        setMicrosites(res?.data || []);
        setShowDropdown(!!res?.data?.length);
      } catch (err) {
        console.error("Fetch microsites error:", err);
        setMicrosites([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Only trigger search if not selected
    if (searchValue.trim() === "") {
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
  }, [searchValue, fetchMicrosites]);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (site: Microsite) => {
    const name = site?.name || "";
    setMicrositeName(name); // Set the input value to the selected name
    setChildId(site._id);
    setMicrositeImage(site?.profilePic || "");
    setMicrositeBio(site?.bio || "");
    setShowDropdown(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setChildId(""); // Clear previously selected childId when typing again
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < microsites.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : microsites.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(microsites[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  console.log("", childId);

  console.log("check microsite", miscrositeBio, miscrositeImage);

  return (
    <div className="w-full max-w-lg relative">
      <p className="text-base mb-2 mt-4">
        Select Microsite<span className="text-primary">*</span>
      </p>
      <div className="relative">
        {miscrositeName ? (
          <input
            ref={inputRef}
            type="text"
            value={miscrositeName}
            onKeyDown={handleKeyDown}
            placeholder="Search microsites..."
            className="w-full pl-4 pr-10 py-2 text-left rounded-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none text-lg"
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search microsites..."
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary outline-none text-lg"
          />
        )}

        {loading && (
          <div className="absolute right-10 top-3">
            <Loader size="size-5" color="fill-primary" />
          </div>
        )}
        {searchValue && (
          <button
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => {
              setSearchValue("");
              setMicrositeName("");
            }}
          >
            ✕
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-full max-h-64 overflow-y-auto"
        >
          {microsites.map((site, index) => (
            <div
              key={site._id}
              onClick={() => handleSelect(site)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center space-x-4 border-b ${
                highlightedIndex === index ? "bg-gray-100" : ""
              }`}
            >
              <Image
                src={
                  site.profilePic && isUrl(site.profilePic)
                    ? site.profilePic
                    : site.profilePic
                    ? `/images/user_avator/${site.profilePic}@3x.png`
                    : "/images/user_avator/default@3x.png" // fallback image
                }
                alt="user image"
                className="w-9 h-9 rounded-full"
                width={120}
                height={120}
              />
              <div className="">
                <h3 className="font-medium">{site?.name}</h3>
                <p className="text-sm text-gray-600 italic">{site?.bio}</p>
              </div>
            </div>
          ))}
          {!microsites.length && !loading && (
            <div className="p-4 text-sm text-gray-500">No microsite found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MicrositeSearchInputField;


