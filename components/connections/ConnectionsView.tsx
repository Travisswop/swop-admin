"use client";

import {
  addDefaultConnection,
  deleteDefaultConnection,
} from "@/action/connections";
import { Connection } from "@/types/connections";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import PrimaryButton from "../button/PrimaryButton";
import Loader from "../ui/Loader";
import isUrl from "../util/isUrl";
import AddressAddInputField from "./AddressAddInputField";
import ConnectionsShowOnGoogleMap from "./ConnectionsShowOnGoogleMap";
import MicrositeSearchInputField from "./MIcrositeSearchInputField";

const style = {
  position: "absolute",
  color: "black",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};
interface ConnectionsViewProps {
  connections: Connection[];
  token: string;
}

interface Friend {
  _id: string;
  lat: number;
  lng: number;
}

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface AddDefaultConnectionResponse {
  success: boolean;
}

const ConnectionsView = ({ connections, token }: ConnectionsViewProps) => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [childId, setChildId] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [addConnectionFlag, setAddConnectionFlag] = useState(false);

  const handleOpenAddConnectionFlag = () => setAddConnectionFlag(true);
  const handleCloseAddConnectionFlag = () => setAddConnectionFlag(false);

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
  );

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
        setAddConnectionFlag(false);
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

  console.log("check data value 123", error, connections);

  return (
    <div className="text-black bg-white py-5 px-8">
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h4 className="text-lg font-medium mb-4">Map</h4>
            <ConnectionsShowOnGoogleMap
              connections={connections}
              selectedFriend={selectedFriend}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-medium">Default Connections</h4>
            <button
              onClick={handleOpenAddConnectionFlag}
              className="border border-black hover:border-gray-500 hover:!text-white text-sm px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 flex items-center gap-1 w-max"
            >
              <FaUserPlus />
              Add New
            </button>
          </div>
          <div className="h-[600px] overflow-auto">
            {connections?.map((el) => (
              <button
                onClick={() => handleSelectFriend(el._id)}
                className={`py-3 px-5 rounded-lg border hover:bg-gray-100 w-full 
              }`}
                key={el._id} // Use unique identifier directly
              >
                <div className="flex w-full items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        isUrl(el.childId.profilePic)
                          ? el.childId.profilePic
                          : `/images/user_avator/${el.childId.profilePic}@3x.png`
                      }
                      alt="user image"
                      className="w-9 h-9 rounded-full"
                      width={120}
                      height={120}
                    />
                    <div>
                      <p className="font-medium text-left">
                        {el?.childId?.name}
                      </p>
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

      <Modal
        open={addConnectionFlag}
        onClose={handleCloseAddConnectionFlag}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-end -m-4 ">
            <button
              className="hover:bg-gray-200 rounded-full cursor-pointer"
              onClick={handleCloseAddConnectionFlag}
            >
              <IoClose className="size-7 text-gray-800 p-1 " />
            </button>
          </div>

          <div className="text-black bg-white py-5 px-8">
            <h4 className="text-lg font-medium">Default Connections Add</h4>

            <MicrositeSearchInputField
              token={token}
              setChildId={setChildId}
              childId={childId}
            />

            <div className="my-4">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-lg font-normal text-gray-900"
              >
                Location<span className="text-base">*</span>
              </label>

              <AddressAddInputField
                setAddress={setAddress}
                setCoordinates={setCoordinates}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <PrimaryButton
                className="!px-8 space-x-2 w-[120px] h-[40px] flex items-center justify-center mt-4"
                type="submit"
              >
                {/* <FaRegSave /> */}
                {loading ? (
                  <Loader size="size-5" color="fill-primary" />
                ) : (
                  "Add New Connection"
                )}
              </PrimaryButton>
              {/* <button
                type="submit"
                className="border border-black hover:border-gray-500  hover:!text-white text-base px-3 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 flex items-center gap-1 w-max"
              >
                {loading ? <p>Loading...</p> : <p> Add New Connection</p>}
              </button> */}
            </form>
          </div>
        </Box>
      </Modal>
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
