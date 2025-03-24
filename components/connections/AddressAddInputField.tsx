"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import with no SSR
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

  return (
    <div className="max-w-lg">
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          value,
          onChange: setValue,
          placeholder: "Search for an address...",
        }}
      />
    </div>
  );
};

export default AddressAddInputField;
