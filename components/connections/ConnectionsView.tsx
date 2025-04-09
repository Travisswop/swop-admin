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
import { AiOutlineUserAdd } from "react-icons/ai";
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
  const [connectionType, setConnectionType] = useState<string[]>([]);

  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [addConnectionFlag, setAddConnectionFlag] = useState(false);

  const handleCloseAddConnectionFlag = () => setAddConnectionFlag(false);

  const handleSelectFriend = useCallback(
    (id: string) => {
      setSelectedFriend((prev) => {
        const selectedConnection = connections.find(
          (friend) => friend._id === id
        );

        if (prev?._id === id) {
          return null;
        }

        if (selectedConnection) {
          return selectedConnection;
        }

        return null;
      });
    },
    [connections]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const lat = coordinates.lat ?? 0;
    const lng = coordinates.lng ?? 0;

    try {
      const response: AddDefaultConnectionResponse = await addDefaultConnection(
        address,
        lat.toString(),
        lng.toString(),
        childId,
        connectionType,
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

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // const deletedConnection = async (id: string, connectionType: string) => {
  //   try {
  //     setDeletingId(id);
  //     const response = await deleteDefaultConnection(id, connectionType, token);

  //     if (response.success) {
  //       toast.success("Connection deleted successfully");
  //     } else {
  //       toast.error("Failed to delete connection");
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setDeletingId(null);
  //   }
  // };

  const deletedConnection = useCallback(
    async (id: string, connectionType: string) => {
      try {
        setDeletingId(id);
        const response = await deleteDefaultConnection(
          id,
          connectionType,
          token
        );
        if (response.success) {
          toast.success("Connection deleted successfully");
        } else {
          toast.error("Failed to delete connection");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong");
      } finally {
        setDeletingId(null);
      }
    },
    [token]
  );

  console.log("check data value 123", error, connections);

  return (
    <div className="text-[#424651] bg-white py-5 px-8">
      <div className="grid grid-cols-2 gap-10">
        {/*Connection Map Top Part */}

        <div className="">
          <div>
            <h4 className="text-xl font-medium mb-5">Map</h4>
            <ConnectionsShowOnGoogleMap
              connections={connections}
              selectedFriend={selectedFriend}
            />
          </div>

          {/*Spotlight  Bottom Part */}

          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-medium">Spotlight</h4>
              <button
                onClick={() => {
                  setAddConnectionFlag(true);
                  setConnectionType(["spotlight"]);
                }}
                className="border border-black hover:border-gray-500 hover:!text-white text-sm px-6 py-2 bg-white text-primary rounded-lg shadow-md hover:bg-black transition duration-200 flex items-center gap-1 w-max"
              >
                <AiOutlineUserAdd className="size-5" />
                Add New
              </button>
            </div>

            <div className="border rounded-lg h-[320px]  overflow-y-auto">
              {connections?.filter(({ connectionType }) =>
                connectionType?.includes("spotlight")
              ).length === 0 && (
                <div className="flex items-center justify-center mt-36">
                  <p className="text-gray-500">No spotlight found.</p>
                </div>
              )}
              {connections
                ?.filter(({ connectionType }) =>
                  connectionType?.includes("spotlight")
                )
                ?.map(({ _id, childId, address }) => {
                  const { name, bio, profilePic } = childId || {};
                  const imageSrc = isUrl(profilePic)
                    ? profilePic
                    : `/images/user_avator/${profilePic}@3x.png`;

                  return (
                    <button
                      key={_id}
                      onClick={() => handleSelectFriend(_id)}
                      className="px-5 w-full text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between py-6 border-b">
                        <div className="flex items-center gap-2">
                          <Image
                            src={imageSrc}
                            alt={`${name || "User"}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover"
                            width={120}
                            height={120}
                          />
                          <div>
                            <p className="font-medium">
                              {name || "Unnamed User"}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {bio || "No bio available"}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {address || "No address"}
                        </p>
                        <button
                          className="text-sm text-red-600 hover:underline w-16 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletedConnection(_id, "spotlight");
                          }}
                        >
                          {deletingId === _id ? (
                            <Loader size={"size-6"} color={"fill-primary"} />
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Default Connect Right Part */}

        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-medium">Default Connections</h4>
            <button
              onClick={() => {
                setAddConnectionFlag(true);
                setConnectionType(["default"]);
              }}
              className="border border-black hover:border-gray-500 hover:!text-white text-sm px-6 py-2 bg-white text-primary rounded-lg shadow-md hover:bg-black transition duration-200 flex items-center gap-1 w-max"
            >
              <AiOutlineUserAdd className="size-5" />
              Add New
            </button>
          </div>
          <div className=" border rounded-lg h-[1000px]  overflow-y-auto">
            {connections?.filter(({ connectionType }) =>
              connectionType?.includes("default")
            )?.length === 0 && (
              <div className="flex items-center justify-center mt-44">
                <p className="text-gray-500">No connections found.</p>
              </div>
            )}
            {connections
              ?.filter(({ connectionType }) =>
                connectionType?.includes("default")
              )
              ?.map((el) => (
                <div
                  className={`px-5 rounded-lg  hover:bg-gray-100 w-full 
              }`}
                  key={el._id}
                >
                  <div className="flex w-full items-center justify-between py-6 border-b">
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          isUrl(el.childId.profilePic)
                            ? el.childId.profilePic
                            : `/images/user_avator/${el.childId.profilePic}@3x.png`
                        }
                        alt="user image"
                        className={`w-12 h-12 rounded-full object-cover`}
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
                      className="text-sm text-red-500 w-16 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletedConnection(el?._id, "default");
                      }}
                    >
                      {deletingId === el?._id ? (
                        <Loader size={"size-6"} color={"fill-primary"} />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Connection Modal */}

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
                {loading ? (
                  <Loader size="size-5" color="fill-primary" />
                ) : (
                  "Add New Connection"
                )}
              </PrimaryButton>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ConnectionsView;
