"use client";
import {
  createDynamicQrCode,
  getDynamicQrCode,
  updateDynamicQrCode,
} from "@/action/dynamicQrCode";
import { QRCodeData } from "@/types/qrcodedata";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { FaRegSave, FaSearch } from "react-icons/fa";
import { IoClose, IoQrCodeSharp } from "react-icons/io5";
import { MdQrCodeScanner } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import PrimaryButton from "../button/PrimaryButton";
import { formatDate } from "../util/formatData";
import MicrositeSearchInputField from "./MicrositeSearchInputField";

interface QrCodeListsProps {
  token: string;
}

const QrCodeLists: React.FC<QrCodeListsProps> = ({ token }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createQRFlag, setCreateQRFlag] = React.useState(false);
  const handleOpenCreateQRFlag = () => setCreateQRFlag(true);
  const handleCloseCreateQRFlag = () => setCreateQRFlag(false);

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

  // Get Action

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [qrCodeData, setQrCodeData] = useState<QRCodeData[]>([]);

  const [totalPages, setTotalPages] = useState(1);
  const [micrositeDataLoading, setMicrositeDataLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [micrositeId, setMicrositeId] = useState("");
  const [qrCodeName, setQrCodeName] = useState("");
  const [qrcodeUrl, setQrcodeUrl] = useState("");
  const [redirectMicrosite, setRedirectMicrosite] = useState("");
  const [dynamicQRCodeId, setDynamicQRCodeId] = useState("");

  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  console.log(totalPages, error);

  useEffect(() => {
    let isMounted = true;
    setMicrositeDataLoading(true);

    const fetchData = async () => {
      try {
        const result = await getDynamicQrCode(token, page, limit, searchTerm);

        if (isMounted) {
          if (result.success) {
            setQrCodeData(result?.data);
            setTotalPages(result.pagination.totalPages);
            setPage(1);
            setLimit(10);
          } else {
            console.error(result.message);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (isMounted) {
          setMicrositeDataLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, page, limit, token]);

  const qrCodeCreatehandler: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setCreateLoading(true);
    setError("");

    try {
      const response = await createDynamicQrCode(
        micrositeId,
        qrCodeName,
        qrcodeUrl,
        redirectMicrosite,
        token
      );

      if (response.success) {
        toast.success("QR Code created successfully");
        console.log("QR Code created successfully");
        setCreateQRFlag(false);
        setQrCodeName("");
        setQrcodeUrl("");
        setSearchTerm("");
        setLimit(12);
      } else {
        const errorMessage =
          response.message ||
          "An unexpected error occurred during QR Code creation.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error creating QR Code:", err);
    } finally {
      setCreateLoading(false);
    }
  };

  const qrCodeUpdatehandler: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError("");

    try {
      const response = await updateDynamicQrCode(
        dynamicQRCodeId,
        qrcodeUrl,
        redirectMicrosite,
        token
      );

      if (response.success) {
        toast.success("QR Code updated successfully");
        console.log("QR Code updated successfully");
        setOpen(false);
        setQrCodeName("");
        setQrcodeUrl("");
        setSearchTerm("");
        setLimit(12);
      } else {
        const errorMessage =
          response.message ||
          "An unexpected error occurred during QR Code update.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error updating QR Code:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-10">
          <p className="text-gray-700 font-semibold text-lg ">QR Codes</p>
          <div>
            <PrimaryButton
              onClick={handleOpenCreateQRFlag}
              className="flex items-center gap-1 !py-2 text-sm"
            >
              <IoQrCodeSharp />
              Create
            </PrimaryButton>
            {/* </Link> */}
          </div>
        </div>
        <div className="flex items-center gap-4 mr-6">
          <div className="w-60 2xl:w-72 relative">
            <input
              type="text"
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          </div>
          {/* <button className="bg-[#EAEAEA] px-4 py-1 flex items-center gap-1 rounded-md">
            <MdDateRange color="gray" className="-translate-y-[2px]" />
            <p className="text-sm font-medium">All Time</p>
            <p className="text-xs text-gray-400">June 13, 2024</p>
          </button> */}
        </div>
      </div>
      {/* <div className="mb-4 flex justify-end absolute right-4 top-[22px]">
        <PrimaryButton className="text-sm">Export</PrimaryButton>
      </div> */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Name
            </th>
            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Type
            </th>
            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Created
            </th>
            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {micrositeDataLoading ? (
            <td colSpan={5} className="text-center py-6">
              Loading...
            </td>
          ) : qrCodeData?.length > 0 ? (
            qrCodeData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${index === 0 ? "border-t" : ""}`}
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <Image
                    alt="qrcode"
                    src={"/images/qr-code.png"}
                    width={300}
                    height={300}
                    className="rounded-lg w-14 h-14 border-2 border-gray-400 shadow-xl"
                  />
                  <div>
                    <p className="font-semibold mb-1 text-black">
                      {item.qrCodeName}
                    </p>
                    <p className="text-xs text-gray-400">{item.qrcodeUrl}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600 font-semibold">
                  Dynamic
                </td>
                <td className="py-3 px-4 text-gray-400">
                  {formatDate(item.createdAt)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleOpen();
                        setDynamicQRCodeId(item?._id);
                        setQrcodeUrl(item?.qrcodeUrl);
                      }}
                      className="bg-[#EAEAEA] text-[#989898] w-12 h-8 rounded-lg flex items-center justify-center"
                    >
                      <TbEdit size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6">
                No qr code found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="flex items-center justify-end -m-4 ">
              <button
                className="hover:bg-gray-200 rounded-full cursor-pointer"
                onClick={handleClose}
              >
                <IoClose className="size-7 text-gray-800 p-1 " />
              </button>
            </div>
            <p className="mb-3 font-semibold text-lg">Tv Commercial QR</p>
            <div className="flex gap-8 w-full items-center">
              <div className="flex flex-1 flex-col gap-3">
                <div className="max-w-md">
                  <div>
                    <p className="text-sm  mb-2">QR Code Link</p>
                    <input
                      type="text"
                      className="px-4 py-2 outline-none focus:outline-none rounded border w-full bg-gray-200"
                      placeholder="Enter Link"
                      value={qrcodeUrl}
                      // onChange={(e) => setQrcodeUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pb-8">
                  <MicrositeSearchInputField
                    setMicrositeId={setMicrositeId}
                    setRedirectMicrosite={setRedirectMicrosite}
                    token={token}
                  />
                </div>

                <PrimaryButton className="!px-6 " onClick={qrCodeUpdatehandler}>
                  <MdQrCodeScanner />
                  {updateLoading ? "Loading" : "Update QR"}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={createQRFlag}
        onClose={handleCloseCreateQRFlag}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-end -m-4 ">
            <button
              className="hover:bg-gray-200 rounded-full cursor-pointer"
              onClick={handleCloseCreateQRFlag}
            >
              <IoClose className="size-7 text-gray-800 p-1 " />
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-3 font-semibold text-lg">Tv Commercial QR</p>
            <div className="flex gap-8 w-full items-center mt-4">
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <p className="text-sm mb-2">QR Code Name</p>
                  <input
                    type="text"
                    className="px-4 py-2 outline-none focus:outline-black rounded border w-full"
                    placeholder="Enter Name"
                    value={qrCodeName}
                    onChange={(e) => setQrCodeName(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-sm  mb-2">QR Code Link</p>
                  <input
                    type="text"
                    className="px-4 py-2 outline-none focus:outline-black rounded border w-full"
                    placeholder="Enter Link"
                    value={qrcodeUrl}
                    onChange={(e) => setQrcodeUrl(e.target.value)}
                  />
                </div>
                <MicrositeSearchInputField
                  setMicrositeId={setMicrositeId}
                  setRedirectMicrosite={setRedirectMicrosite}
                  token={token}
                />

                <PrimaryButton
                  className="!px-8 space-x-2 "
                  onClick={qrCodeCreatehandler}
                >
                  <FaRegSave />
                  {createLoading ? "Loading" : " Create"}
                </PrimaryButton>
              </div>
              <div className="bg-white p-6  w-56 h-auto rounded-xl"></div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default QrCodeLists;
