"use client";
import {
  createDynamicQrCode,
  getDynamicQrCode,
  updateDynamicQrCode,
} from "@/action/dynamicQrCode";
import { getAllMicrosites } from "@/action/microsites";
import qrCodeImg from "@/public/images/qr-code.png";
import { Microsite } from "@/types/microsites";
import { QRCodeData } from "@/types/qrcodedata";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaRegSave, FaSearch } from "react-icons/fa";
import { FiEdit, FiSend } from "react-icons/fi";
import { IoClose, IoQrCodeSharp } from "react-icons/io5";
import { MdOutlineFileDownload, MdQrCodeScanner } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import PrimaryButton from "../button/PrimaryButton";
import { formatDate } from "../util/formatData";

interface QrCodeListsProps {
  token: string;
}

const QrCodeLists: React.FC<QrCodeListsProps> = ({ token }) => {
  const router = useRouter();
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

  const [micrositeFetchLoading, setMicrositeFetchLoading] = useState(false);

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

  const [searchValue, setSearchValue] = useState<string>("");
  const [microsites, setMicrosites] = useState<Microsite[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMicrosites = useCallback(
    async (query: string) => {
      if (query.trim() === "") {
        setMicrosites([]);
        setShowDropdown(false);
        return;
      }

      try {
        setMicrositeFetchLoading(true);
        const response = await getAllMicrosites(token, query);
        if (response?.data?.length > 0) {
          setMicrosites(response.data);
          setShowDropdown(true);
        } else {
          setMicrosites([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching microsites:", error);
        setMicrosites([]);
        setShowDropdown(false);
      } finally {
        setMicrositeFetchLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (searchValue.trim() === "") {
      setMicrosites([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      fetchMicrosites(searchValue);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchValue, fetchMicrosites]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        toast.success("QR Code create successfully");
        console.log("QR Code create successfully");
        router.back();
      } else {
        toast.error("Failed to QR Code create");
      }
    } catch (err) {
      console.error("Error QR Code create:", err);
      toast.error("Error QR Code create");
      setError("Failed to QR Code create. Please try again.");
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
        toast.success("QR Code update successfully");
        console.log("QR Code update successfully");
        router.back();
      } else {
        toast.error("Failed to QR Code update");
      }
    } catch (err) {
      console.error("Error QR Code update:", err);
      toast.error("Error QR Code update");
      setError("Failed to QR Code update. Please try again.");
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
                        setDynamicQRCodeId(item._id);
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
                No orders found.
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
            <p className="mb-3 font-semibold text-lg">Tv Commercial QR</p>
            <div className="flex gap-8 w-full items-center">
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <p className="text-sm mb-2">Link</p>
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
                </div>
                <div className="pb-8">
                  <p className="text-sm mb-2">Redirect Microsite</p>

                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Search Microsites..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="px-4 py-2 outline-none focus:outline-black rounded border w-full"
                    />
                    {micrositeFetchLoading && (
                      <div className="absolute right-2 top-2">
                        <span className="loader" /> Loading...
                      </div>
                    )}
                    {showDropdown && microsites.length > 0 && (
                      <div
                        ref={dropdownRef}
                        className="absolute bg-white shadow-lg w-full max-h-64 overflow-y-auto rounded z-50"
                      >
                        {microsites.map((site) => (
                          <button
                            key={site._id}
                            className="text-left p-2 border-b hover:bg-gray-100 w-full"
                            onClick={() => {
                              setMicrositeId(site._id);
                              setRedirectMicrosite(
                                site?.parentId?.referralLink
                              );
                              setShowDropdown(false);
                            }}
                          >
                            <h3> {site?.parentId?.name}</h3>
                            <p className="text-sm italic text-gray-600">
                              {site?.parentId?.bio}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                    {showDropdown &&
                      !micrositeFetchLoading &&
                      microsites.length === 0 && (
                        <div className="absolute bg-white shadow-lg w-full rounded p-2 text-gray-500">
                          No microsite found
                        </div>
                      )}
                  </div>
                </div>
                <PrimaryButton className="!px-6 " onClick={qrCodeUpdatehandler}>
                  <MdQrCodeScanner />
                  {updateLoading ? "Loading" : "Update QR"}
                </PrimaryButton>
              </div>
              <div className="bg-[#EAEAEA] p-6  w-56 h-auto rounded-xl">
                <Image src={qrCodeImg} alt="qr image" />
                <div className="flex items-center gap-2 justify-center mt-4">
                  <PrimaryButton className="!p-2">
                    <FiEdit />
                  </PrimaryButton>
                  <PrimaryButton className="!p-2">
                    <MdOutlineFileDownload />
                  </PrimaryButton>
                  <PrimaryButton className="!p-2">
                    <FiSend />
                  </PrimaryButton>
                </div>
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
                <div className="pb-8">
                  <p className="text-sm mb-2">Redirect Microsite</p>

                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Search Microsites..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="px-4 py-2 outline-none focus:outline-black rounded border w-full"
                    />
                    {micrositeFetchLoading && (
                      <div className="absolute right-2 top-2 text-xs">
                        <span className="loader" /> Loading...
                      </div>
                    )}
                    {showDropdown && microsites.length > 0 && (
                      <div
                        ref={dropdownRef}
                        className="absolute bg-white shadow-lg w-full max-h-64 overflow-y-auto rounded z-50"
                      >
                        {microsites.map((site) => (
                          <button
                            key={site._id}
                            className="text-left p-2 border-b hover:bg-gray-100 w-full"
                            onClick={() => {
                              setMicrositeId(site._id);
                              setRedirectMicrosite(
                                site?.parentId?.referralLink
                              );
                              setShowDropdown(false);
                            }}
                          >
                            <h3> {site?.parentId?.name}</h3>
                            <p className="text-sm italic text-gray-600">
                              {site?.parentId?.bio}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                    {showDropdown &&
                      !micrositeFetchLoading &&
                      microsites.length === 0 && (
                        <div className="absolute bg-white shadow-lg w-full rounded p-2 text-gray-500">
                          No microsite found
                        </div>
                      )}
                  </div>
                </div>
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
