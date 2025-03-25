"use client";

import { addDefaultConnection } from "@/action/connections";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import AddressAddInputField from "./AddressAddInputField";
import MIcrositeSearchInputField from "./MIcrositeSearchInputField";

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

  console.log("check data value 123", error);

  return (
    <div className="text-black bg-white py-5 px-8">
      <h4 className="text-lg font-medium">Default Connections Add</h4>

      <MIcrositeSearchInputField
        token={token}
        setChildId={setChildId}
        childId={childId}
      />

      <div className="my-4">
        <label
          htmlFor="name-icon"
          className="block mb-2 text-lg font-normal text-gray-900"
        >
          Location<span className="text-primary">*</span>
        </label>

        <AddressAddInputField
          setAddress={setAddress}
          setCoordinates={setCoordinates}
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
