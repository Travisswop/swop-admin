"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import useLoadGoogleMapsScript from "../hook/useLoadGoogleMapsScript";

const GooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete"),
  { ssr: false }
);

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface AddressAddInputFieldProps {
  setAddress: (value: string) => void;
  setCoordinates: (coords: Coordinates) => void;
}

interface PlaceValue {
  label: string;
  value: {
    description: string;
    place_id: string;
  };
}

const AddressAddInputField: React.FC<AddressAddInputFieldProps> = ({
  setAddress,
  setCoordinates,
}) => {
  const [value, setValue] = useState<PlaceValue | null>(null);

  const isLoaded = useLoadGoogleMapsScript(
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
  );

  useEffect(() => {
    if (value && value.value?.place_id && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId: value.value.place_id }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry.location;
          setCoordinates({
            lat: location.lat(),
            lng: location.lng(),
          });
          setAddress(value.label);
        } else {
          console.error("Geocode failed:", status);
          setCoordinates({ lat: null, lng: null });
        }
      });
    }
  }, [value, setAddress, setCoordinates]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="max-w-lg">
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: setValue,
          placeholder: "Search for an address...",
          className: "react-select-container",
          classNamePrefix: "react-select",
          styles: {
            control: (provided, state) => ({
              ...provided,
              padding: ".2rem", // pl-4
              borderRadius: "0.5rem", // rounded-lg
              borderColor: state.isFocused ? "#3b82f6" : "#d1d5db", // primary or gray-300
              boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
              fontSize: "1.125rem", // text-lg
              outline: "none",
              "&:hover": {
                borderColor: "#3b82f6",
              },
            }),
          },
        }}
      />
    </div>
  );
};

export default AddressAddInputField;
