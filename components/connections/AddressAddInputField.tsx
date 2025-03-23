"use client";

import { LoadScript } from "@react-google-maps/api";
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from "react-places-autocomplete";

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface AddressAddInputFieldProps {
  address: string;
  setAddress: (value: string) => void;
  coordinates: Coordinates;
  setCoordinates: (value: Coordinates) => void;
}

const AddressAddInputField: React.FC<AddressAddInputFieldProps> = ({
  address,
  setAddress,
  setCoordinates,
}) => {
  const handleChange = (value: string) => {
    setAddress(value);
  };

  const handleSelect = async (value: string) => {
    setAddress(value);
    try {
      // Geocoding address to get lat/lng
      const results = await geocodeByAddress(value);
      if (results[0]) {
        // Get lat/lng for the first result
        const latLng = await getLatLng(results[0]);
        setCoordinates(latLng);
        console.log("Selected Address:", value);
        console.log("Coordinates:", latLng);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk"
      libraries={["places"]}
    >
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  autoComplete: "off",
                  type: "text",
                  id: "microsite",
                  className:
                    "bg-[#ffffff] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 active:border-primary outline-none max-w-lg",
                  placeholder: "Search places",
                  onFocus: () => {
                    console.log("Input focused!");
                  },
                })}
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {loading && (
                    <div className="px-4 py-2 text-gray-500">Loading...</div>
                  )}
                  {suggestions.map((suggestion: Suggestion, index: number) => {
                    const isActive = suggestion.active;
                    const className = isActive
                      ? "bg-gray-100 cursor-pointer"
                      : "bg-white cursor-pointer";
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: `px-4 py-2 text-gray-700 hover:bg-gray-100 ${className}`,
                        })}
                        key={index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </LoadScript>
  );
};

export default AddressAddInputField;
