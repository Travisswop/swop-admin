"use client";
import React, { useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import PrimaryButton from "../button/PrimaryButton";
// import { FiDownload } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import qrCodeImg from "@/public/images/qr-code.png";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiEdit, FiSend } from "react-icons/fi";
import { MdOutlineFileDownload, MdQrCodeScanner } from "react-icons/md";

// Mock Components for demonstration
const Checkbox = ({
  isSelected,
  onChange,
}: {
  isSelected: boolean;
  onChange: () => void;
}) => (
  <input
    type="checkbox"
    checked={isSelected}
    onChange={onChange}
    className="cursor-pointer mr-1"
  />
);

// const DeleteQRCode = ({ id }: { id: string }) => (
//   <button className="bg-red-500 text-white w-9 h-9 rounded-lg flex items-center justify-center">
//     Delete
//   </button>
// );

// const ShareCustomQRCode = ({ url }: { url: string }) => (
//   <button className="bg-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center">
//     Share
//   </button>
// );

// Mock Data
const mockData = [
  {
    _id: "1",
    name: "TV Commercial QR",
    data: "https://example.com/1",
    type: "Dynamic",
    qrCodeUrl: qrCodeImg,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Marketing Flyers",
    data: "https://example.com/2",
    type: "Static",
    qrCodeUrl: qrCodeImg,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Product QR",
    data: "https://example.com/3",
    type: "Dynamic",
    qrCodeUrl: qrCodeImg,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Website Products QR",
    data: "https://example.com/3",
    type: "Dynamic",
    qrCodeUrl: qrCodeImg,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Marketing Flyers",
    data: "https://example.com/2",
    type: "Static",
    qrCodeUrl: qrCodeImg,
    createdAt: new Date().toISOString(),
  },
];

const getFormattedDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();

const QrCodeLists = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockData.map((item) => item._id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  //   const handleExport = () => {
  //     const selectedItems = mockData.filter((item) =>
  //       selectedIds.includes(item._id)
  //     );

  //     selectedItems.forEach((item) => {
  //       const link = document.createElement("a");
  //       link.href = item.qrCodeUrl;
  //       link.download = `${item.name || "qrcode"}.png`;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     });
  //   };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    color: "black",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw", // Allow width to adjust based on content
    maxWidth: "90%", // Optional: Limits the width to 90% of the viewport width
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4 flex justify-end absolute right-4 top-[22px]">
        <PrimaryButton
          //   onClick={handleExport}
          className="text-sm"
        >
          Export
        </PrimaryButton>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <td className="py-2 px-4 text-left -translate-x-2 mb-2">
              <label
                htmlFor="selectAll"
                className="border px-3 rounded-full flex items-center w-max py-1 cursor-pointer"
              >
                <input
                  id="selectAll"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="cursor-pointer mr-1"
                />
                <label htmlFor="selectAll" className="cursor-pointer text-xs">
                  Select all
                </label>
              </label>
            </td>

            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Types
            </th>
            {/* <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Scans
            </th> */}
            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Created
            </th>
            <th className="py-2 px-4 text-left text-gray-500 font-normal">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {mockData.map((item, index: number) => (
            <tr
              key={item._id}
              className={`border-b ${index === 0 && "border-t"}`}
            >
              <td className="py-3 px-4 flex items-center gap-3">
                <Checkbox
                  isSelected={selectedIds.includes(item._id)}
                  onChange={() => handleRowSelection(item._id)}
                />
                <Image
                  alt="qrcode"
                  src={item.qrCodeUrl}
                  width={300}
                  height={300}
                  className="rounded-lg w-14 h-14 border-2 border-gray-400 shadow-xl"
                />
                {/* <p className="font-semibold mb-1 text-black">{item.type}</p> */}
                <div>
                  <p className="font-semibold mb-1 text-black">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.data}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600 font-semibold">
                {item.type}
              </td>
              {/* <td className="py-3 px-4 text-gray-600 font-semibold">#1290</td> */}
              <td className="py-3 px-4 text-gray-400">
                {getFormattedDate(item.createdAt)}
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {/* <Link href={`/qr-code/${item._id}`}> */}
                  <button
                    onClick={handleOpen}
                    className="bg-[#EAEAEA] text-[#989898] w-12 h-8 rounded-lg flex items-center justify-center"
                  >
                    <TbEdit size={17} />
                  </button>
                  {/* </Link> */}
                  {/* <DeleteQRCode id={item._id} />
                  <ShareCustomQRCode url={item.qrCodeUrl} />
                  <a
                    href={item.qrCodeUrl}
                    download="qrcode.png"
                    className="bg-black text-white w-9 h-9 flex items-center justify-center rounded-lg"
                  >
                    <FiDownload size={18} />
                  </a> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div>
            <p className="mb-3 font-semibold text-lg">Tv Commercial QR</p>
            <div className="flex gap-8 w-full items-center">
              <div className="flex flex-1 flex-col gap-3">
                <div>
                  <p className="text-sm ">Link</p>
                  <input
                    type="text"
                    className="px-4 py-2 outline-none focus:outline-none rounded border w-full"
                    placeholder="Enter Link"
                  />
                </div>
                <div className="pb-8">
                  <p className="text-sm ">New Link</p>
                  <input
                    type="text"
                    className="px-4 py-2 outline-none focus:outline-none rounded border w-full"
                    placeholder="Enter New Link"
                  />
                </div>
                <PrimaryButton className="!px-6 ">
                  <MdQrCodeScanner />
                  Update QR
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
    </div>
  );
};

export default QrCodeLists;
