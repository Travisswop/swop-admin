"use client";

import { cn } from "@/lib/utils";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";

const demoTableData: {
  id: number;
  name: string;
  image: string;
  username: string;
  address: string;
  code: string;
}[] = [
  // {
  //   id: 1,
  //   name: "Hamida Hasan",
  //   username: "Hamida.Swopple.ID",
  //   address: "0xB4Fh3466...67Xd",
  //   code: "8hg4xcvv",
  //   image:
  //     "https://img.freepik.com/free-photo/portrait-elegant-professional-businesswoman_23-2150917246.jpg?t=st=1741512909~exp=1741516509~hmac=234907dc23cab8311b9c0bdf724cebec486b814bda168cf2f988a97577d5faf9&w=740",
  // },
  // {
  //   id: 2,
  //   name: "John Doe",
  //   username: "John.Swopple.ID",
  //   address: "0xA3Gh6572...88Yt",
  //   code: "7as3sdvf",
  //   image:
  //     "https://img.freepik.com/free-photo/handsome-young-businessman-suit_23-2148197598.jpg?w=740",
  // },
  // {
  //   id: 3,
  //   name: "Sarah Adams",
  //   username: "Sarah.Swopple.ID",
  //   address: "0xF9Jk1234...77Wx",
  //   code: "5xy7tuvw",
  //   image:
  //     "https://img.freepik.com/free-photo/confident-young-businesswoman-glasses_23-2148197620.jpg?w=740",
  // },
  // {
  //   id: 4,
  //   name: "Michael Brown",
  //   username: "Michael.Swopple.ID",
  //   address: "0xM1Nk5678...99Zx",
  //   code: "4pq9lmno",
  //   image:
  //     "https://img.freepik.com/free-photo/young-smiling-businessman-sitting-office_23-2148197599.jpg?w=740",
  // },
  // {
  //   id: 5,
  //   name: "Emily Wilson",
  //   username: "Emily.Swopple.ID",
  //   address: "0xXyZk9876...55Qr",
  //   code: "3mn8abcs",
  //   image:
  //     "https://img.freepik.com/free-photo/successful-businesswoman-smiling-office_23-2148197630.jpg?w=740",
  // },
];

const CustomTable = () => {
  const [name, setName] = useState("");

  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  return (
    <div className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg py-10">
      <article className="flex justify-end items-end w-full gap-4 px-4">
        <div
          className={cn(
            "flex flex-row gap-2 2xl:gap-4 w-fit justify-center items-center ml-auto"
          )}
        >
          <h2>Filter</h2>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Name</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={name}
              label="Name"
              onChange={handleChangeName}
              className="text-sm p-0"
            >
              <MenuItem value={"ascending"} className="p-0">
                Ascending
              </MenuItem>
              <MenuItem value={"descending"}>Descending</MenuItem>
            </Select>
          </FormControl>

          <button className="text-white h-full bg-black px-4 py-2 rounded-xl w-28 flex justify-center items-center">
            <span>Export</span>&nbsp;{" "}
            <MdOutlineFileDownload className="h-5 w-5" />
          </button>
        </div>
      </article>
      <table className="w-full text-left rtl:text-right text-gray-500 ">
        <thead className="  text-center border-b">
          <tr>
            {["User", "Wallet Address", "Reference", "View Details"].map(
              (header, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-3  text-base  font-normal ${
                    header === "User" ? "text-start pl-28" : "text-center"
                  } `}
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {demoTableData.length === 0 && (
            <tr className="text-center text-gray-500">
              <td colSpan={4} className="px-6 py-4 mt-10">
                No data available
              </td>
            </tr>
          )}
          {demoTableData.map((el) => (
            <tr
              key={el.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center"
            >
              <td className="px-6 py-4 ">
                <div className="flex items-center gap-2 space-x-2 ">
                  <Image
                    src={el.image}
                    alt="User Picture"
                    width={70}
                    height={70}
                    className="border-[3px] border-white rounded-full shadow-md"
                  />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h4 className="text-xl font-semibold">{el.name}</h4>
                    <span className="text-gray-400 text-sm font-normal">
                      {el.username}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <p>{el.address}</p>
              </td>
              <td>
                <p>{el.code}</p>
              </td>
              <td>
                <Link
                  href={`/swop-id/${el.id}`}
                  className="text-2xl text-gray-500"
                >
                  <LuEye className="mx-auto" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
