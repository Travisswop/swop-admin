"use client";

import { addDefaultConnection } from "@/action/connections";
import { getAllMicrosites } from "@/action/microsites";
import { Microsite } from "@/types/microsites";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AddressAddInputField from "./AddressAddInputField";

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface AddDefaultConnectionResponse {
  success: boolean;
}

const AddNewConnectionsForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [childId, setChildId] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Optimized: Debounced fetch function
  const debouncedFetch = useCallback(async () => {
    if (searchValue.trim() === "") {
      setMicrosites([]);
      setShowDropdown(false);
      return;
    }

    try {
      const data = await getAllMicrosites(token, searchValue); // Await the API call
      setMicrosites(data?.data); // Assuming API returns data here
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching microsites:", error);
      setMicrosites([]);
      setShowDropdown(false);
    }
  }, [searchValue, token]);

  // Debounce Effect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      debouncedFetch();
    }, 400); // Slightly lower delay for faster UX

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [debouncedFetch]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const lat = coordinates.lat ?? 0; // Ensure `lat` is a number or 0
    const lng = coordinates.lng ?? 0; // Ensure `lng` is a number or 0

    try {
      // Ensure that address, coordinates, and childId are correctly typed
      const response: AddDefaultConnectionResponse = await addDefaultConnection(
        address,
        lat.toString(), // Send lat and lng as strings if needed by the API
        lng.toString(), // Send lat and lng as strings if needed by the API
        childId,
        token
      );

      if (response.success) {
        toast.success("Connection added successfully");
        console.log("Connection added successfully");
        router.back();
      } else {
        toast.error("Failed to add connection");
      }
    } catch (err) {
      console.error("Error adding connection:", err);
      toast.error("Error adding connection");
      setError("Failed to add connection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log("check data value", error);

  return (
    <div className="text-black bg-white py-5 px-8">
      <h4 className="text-lg font-medium">Default Connections Add</h4>
      <div className="my-4">
        <label
          htmlFor="name-icon"
          className="block mb-2 text-lg font-normal text-gray-900"
        >
          Microsite<span className="text-primary">*</span>
        </label>

        <div className="relative max-w-lg">
          <input
            autoComplete="off"
            type="text"
            id="microsite"
            className="bg-[#ffffff] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 active:border-primary outline-none"
            placeholder="Search microsites"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              if (microsites.length > 0) setShowDropdown(true);
            }}
          />
          {showDropdown && microsites.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {microsites.map((site) => (
                <div
                  key={site._id}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchValue(site.name);
                    setChildId(site._id);
                    setShowDropdown(false);
                  }}
                >
                  <p className="font-semibold">{site.name}</p>
                  <p className="text-sm text-gray-500">{site.bio}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="my-4">
        <label
          htmlFor="name-icon"
          className="block mb-2 text-lg font-normal text-gray-900"
        >
          Location<span className="text-primary">*</span>
        </label>

        <AddressAddInputField
          setAddress={setAddress}
          address={address}
          setCoordinates={setCoordinates}
          coordinates={coordinates}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="border border-black hover:border-gray-500  hover:!text-white text-base px-3 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 flex items-center gap-1 w-max"
        >
          {loading ? <p>Loading...</p> : <p> Add New Connection</p>}
        </button>
      </form>
    </div>
  );
};

export default AddNewConnectionsForm;
