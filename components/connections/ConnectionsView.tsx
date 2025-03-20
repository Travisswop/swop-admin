"use client";

import { deleteDefaultConnection } from "@/action/connections";
import { Connection } from "@/types/connections";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import ConnectionsShowOnGoogleMap from "./ConnectionsShowOnGoogleMap";

interface ConnectionsViewProps {
  connections: Connection[];
  token: string;
}

interface Friend {
  _id: string;
  lat: number;
  lng: number;
}

const ConnectionsView = ({ connections, token }: ConnectionsViewProps) => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const deletedConnection = useCallback(
    async (id: string) => {
      try {
        const response = await deleteDefaultConnection(id, token);
        if (response.success) {
          toast.success("Connection deleted successfully");
        } else {
          toast.error("");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    },
    [token]
  );

  const handleSelectFriend = useCallback(
    (id: string) => {
      setSelectedFriend((prev) => {
        // Check if the selected friend exists in the connections array
        const selectedConnection = connections.find(
          (friend) => friend._id === id
        );

        // If a friend is selected and it's the same as the previous selection, set it to null
        if (prev?._id === id) {
          return null;
        }

        // If a valid friend is found, set the friend object
        if (selectedConnection) {
          return selectedConnection;
        }

        return null; // Return null if no friend found
      });
    },
    [connections]
  ); // Add `connections` to the dependency array

  return (
    <div className="text-black bg-white py-5 px-8">
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h4 className="text-lg font-medium mb-4">Map</h4>
            {/* <Image src={connectionMap} alt="connection map" /> */}
            <ConnectionsShowOnGoogleMap
              connections={connections}
              selectedFriend={selectedFriend}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-medium">Default Connections</h4>
            <Link
              href={"/add-new-connections"}
              className="border border-black hover:border-gray-500 hover:!text-white text-sm px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 flex items-center gap-1 w-max"
            >
              <FaUserPlus />
              Add New
            </Link>
          </div>
          {connections?.map((el) => (
            <button
              onClick={() => handleSelectFriend(el._id)}
              className={`py-3 px-5 rounded-lg border hover:bg-gray-100 w-full 
              }`}
              key={el._id} // Use unique identifier directly
            >
              <div className="flex w-full items-center justify-between py-3 border-b">
                <div className="flex items-center gap-2">
                  {/* <Image
                    src={randomImg}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  /> */}

                  <img
                    src={el.childId.profilePic}
                    alt="user image"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-left">{el?.childId?.name}</p>
                    <p className="text-gray-400 text-xs text-left">
                      {el?.childId?.bio}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{el?.address}</p>
                <button
                  style={{ color: "red" }}
                  className="text-sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering selection
                    deletedConnection(el?._id);
                  }}
                >
                  Remove
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsView;

{
  /* <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-medium">Spotlight</h4>
              <PrimaryButton className="flex items-center gap-1 bg-white border border-black hover:border-gray-500 !text-black hover:!text-white !py-1.5 text-sm">
                <FaUserPlus />
                Add New
              </PrimaryButton>
            </div>
            <div className="py-3 px-5 rounded-lg border">
              <div className="">
                <div className="flex w-full items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Image
                      src={randomImg}
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Kamal Shekh</p>
                      <p className="text-gray-400 text-xs">General Manager</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Uttara, Dhaka</p>
                  <button style={{ color: "red" }} className="text-sm">
                    Remove
                  </button>
                </div>
              </div>
              <div className="">
                <div className="flex w-full items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Image
                      src={salmanImg}
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Salman H. Saikote</p>
                      <p className="text-gray-400 text-xs">CTO Of Swop</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Aftabnagar, Dhaka</p>
                  <button style={{ color: "red" }} className="text-sm">
                    Remove
                  </button>
                </div>
              </div>
              <div className="">
                <div className="flex w-full items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={travisImg}
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium">Travis Herron</p>
                      <p className="text-gray-400 text-xs">CEO Of Swop</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Charlotte, NC</p>
                  <button style={{ color: "red" }} className="text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div> */
}
