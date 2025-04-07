"use client";

import { Connection } from "@/types/connections";
import {
  Circle,
  GoogleMap,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import isUrl from "../util/isUrl";

// Defining the Friend interface with lat and lng
interface Friend {
  _id: string;
  lat: number;
  lng: number;
}

// Ensure that the Connection interface is correctly imported or defined.
interface ConnectionsShowOnGoogleMapProps {
  connections: Connection[]; // Array of Connection objects
  selectedFriend: Friend | null; // Friend object or null
}

const containerStyle = {
  width: "100%",
  height: "600px",
};

export default function ConnectionsShowOnGoogleMap({
  connections,
  selectedFriend,
}: ConnectionsShowOnGoogleMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const mapStyles = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [{ saturation: -100 }, { gamma: 0.8 }],
    },
  ];

  // Distance calculation function
  const getDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance;
  };

  // Ensuring the map is loaded and handling selectedFriend
  if (!isLoaded) return <div>Loading Map...</div>;

  let selectedConnection: Connection | undefined = undefined;

  if (selectedFriend) {
    selectedConnection = connections.find((c) => c._id === selectedFriend._id);
  }

  if (mapRef.current && selectedConnection) {
    mapRef.current.panTo({
      lat: selectedConnection.lat,
      lng: selectedConnection.lng,
    });
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        selectedConnection
          ? { lat: selectedConnection.lat, lng: selectedConnection.lng }
          : { lat: 40.7128, lng: -74.006 } // New York City default
      }
      zoom={6}
      onLoad={(map: google.maps.Map) => {
        mapRef.current = map;
      }}
      options={{ styles: mapStyles }}
    >
      {/* Show circle around selected friend */}
      {selectedConnection?.lat && selectedConnection?.lng && (
        <Circle
          center={{
            lat: selectedConnection.lat,
            lng: selectedConnection.lng,
          }}
          radius={5000} // 5km
          options={{
            strokeColor: "#4F46E5", // Indigo
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#4F46E5",
            fillOpacity: 0.35,
          }}
        />
      )}

      {/* Markers */}
      {connections.map((connection) => {
        const isSelected = selectedFriend?._id === connection._id;

        const isNearby =
          selectedFriend &&
          getDistance(
            connection.lat,
            connection.lng,
            selectedFriend.lat,
            selectedFriend.lng
          ) < 5; // < 5 km

        return (
          <OverlayView
            key={connection._id}
            position={{ lat: connection.lat, lng: connection.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className={clsx(
                "w-16 h-16 rounded-full p-1 flex items-center justify-center shadow-lg border-4 transition-all duration-300 transform",
                {
                  "border-blue-500 bg-blue-100 scale-110": isSelected, // Enlarged for selected
                  "border-purple-500 bg-purple-100": isNearby && !isSelected,
                  "border-gray-300 bg-white": !isSelected && !isNearby,
                }
              )}
            >
              {/* Profile Picture */}
              {connection.childId?.profilePic && (
                <Image
                  src={
                    isUrl(connection.childId.profilePic)
                      ? connection.childId.profilePic
                      : `/images/user_avator/${connection.childId.profilePic}@3x.png`
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  width={1200}
                  height={700}
                />
              )}
            </div>
          </OverlayView>
        );
      })}
    </GoogleMap>
  );
}
