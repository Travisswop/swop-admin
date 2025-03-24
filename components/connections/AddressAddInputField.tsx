// "use client";

// import React, { useCallback, useState } from "react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
//   Suggestion,
// } from "react-places-autocomplete";

// interface Coordinates {
//   lat: number | null;
//   lat: number | null;
// }

// interface AddressAddInputFieldProps {
//   address: string;
//   setAddress: (value: string) => void;
//   coordinates: Coordinates;
//   setCoordinates: (value: Coordinates) => void;
// }

// const AddressAddInputField: React.FC<AddressAddInputFieldProps> = ({
//   address,
//   setAddress,
//   setCoordinates,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = useCallback(
//     (value: string) => setAddress(value),
//     [setAddress]
//   );

//   const handleSelect = useCallback(
//     async (value: string) => {
//       setAddress(value);
//       setIsLoading(true);
//       try {
//         const results = await geocodeByAddress(value);
//         if (results?.[0]) {
//           const latLng = await getLatLng(results[0]);
//           setCoordinates(latLng);
//         } else {
//           console.warn("No geocode results found.");
//           setCoordinates({ lat: null, lng: null });
//         }
//       } catch (error) {
//         console.error("Error fetching coordinates:", error);
//         setCoordinates({ lat: null, lng: null });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setAddress, setCoordinates]
//   );

//   return (
//     <div className="relative max-w-lg">
//       <PlacesAutocomplete
//         value={address}
//         onChange={handleChange}
//         onSelect={handleSelect}
//         debounce={300} // smoother typing experience
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 autoComplete: "off",
//                 type: "text",
//                 className:
//                   "bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 outline-none",
//                 placeholder: "Search places...",
//               })}
//             />
//             {(suggestions.length > 0 || loading || isLoading) && (
//               <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                 {(loading || isLoading) && (
//                   <div className="px-4 py-2 text-gray-500">Loading...</div>
//                 )}
//                 {suggestions.map((suggestion: Suggestion, index: number) => {
//                   const { description, active } = suggestion;
//                   const baseClass = "px-4 py-2 text-gray-700 cursor-pointer";
//                   const activeClass = active ? "bg-gray-100" : "bg-white";

//                   return (
//                     <div
//                       key={index}
//                       {...getSuggestionItemProps(suggestion, {
//                         className: `${baseClass} ${activeClass}`,
//                       })}
//                     >
//                       {description || "No description"}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </div>
//   );
// };

// export default AddressAddInputField;

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
        apiKey="AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk"
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
