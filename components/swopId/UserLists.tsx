"use client";

import { cn } from "@/lib/utils";
import { UserDataResponse } from "@/types/user";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import isUrl from "../util/isUrl";
import { useRouter, useSearchParams } from "next/navigation";

const UserLists = ({ userLists }: { userLists: UserDataResponse }) => {
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/swop-id?page=${newPage}&limit=${limit}`);
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
          {userLists.data.map((el) => (
            <tr
              key={el._id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center"
            >
              <td className="px-6 py-4 ">
                <div className="flex items-center gap-2 space-x-2 ">
                  <Image
                    src={
                      isUrl(el.profilePic)
                        ? el.profilePic
                        : `/images/user_avator/${el.profilePic}@3x.png`
                    }
                    alt="User Picture"
                    width={70}
                    height={70}
                    className="border-[3px] border-white rounded-full shadow-md"
                  />
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h4 className="text-xl font-semibold">{el.name}</h4>
                    <span className="text-gray-400 text-sm font-normal">
                      {el.primaryWalletEns || "N/A"}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <p>{el?.walletData?.wallet?.ethAddress || "N/A"}</p>
              </td>
              <td>
                <p>{el.referralCode}</p>
              </td>
              <td>
                <Link
                  href={`/swop-id/${el._id}`}
                  className="text-2xl text-gray-500"
                >
                  <LuEye className="mx-auto" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={userLists.data.length < limit}
          className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserLists;
