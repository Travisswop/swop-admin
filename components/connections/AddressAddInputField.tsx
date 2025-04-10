"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useState } from "react";

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

const isGoogleMapsScriptLoaded = () =>
  typeof window !== "undefined" &&
  typeof window.google === "object" &&
  typeof window.google.maps === "object";

const AddressAddInputField: React.FC<AddressAddInputFieldProps> = ({
  setAddress,
  setCoordinates,
}) => {
  const [value, setValue] = useState<PlaceValue | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(
    isGoogleMapsScriptLoaded()
  );

  useEffect(() => {
    if (value?.value?.place_id && isGoogleMapsScriptLoaded()) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId: value.value.place_id }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const location = results[0].geometry?.location;
          if (location) {
            setCoordinates({
              lat: location.lat(),
              lng: location.lng(),
            });
            setAddress(value.label);
          } else {
            console.error("Location data missing");
            setCoordinates({ lat: null, lng: null });
          }
        } else {
          console.error("Geocode failed:", status);
          setCoordinates({ lat: null, lng: null });
        }
      });
    }
  }, [value, setAddress, setCoordinates]);

  return (
    <>
      {/* Load Google Maps script manually */}
      {!isGoogleMapsScriptLoaded() && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
          strategy="afterInteractive"
          onLoad={() => setIsScriptLoaded(true)}
          onError={() => {
            console.error("Google Maps script failed to load");
            setIsScriptLoaded(false);
          }}
        />
      )}

      <div className="max-w-lg">
        {isScriptLoaded ? (
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
                  padding: ".2rem",
                  borderRadius: "0.5rem",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                  fontSize: "1.125rem",
                  outline: "none",
                  "&:hover": {
                    borderColor: "#3b82f6",
                  },
                }),
              },
            }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default AddressAddInputField;
