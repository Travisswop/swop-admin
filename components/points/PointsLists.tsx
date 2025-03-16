"use client";
import { Pagination, Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import isUrl from "../util/isUrl";
import { ApiResponse } from "@/types/points";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const PointsLists = ({ pointLists }: { pointLists: ApiResponse }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [loading, setLoading] = useState(false);
  //   const [name, setName] = useState("");
  const router = useRouter();
  const limit = Number(searchParams.get("limit")) || 10;

  //  const handleChangeName = (event: SelectChangeEvent) => {
  //     setName(event.target.value as string);
  //   };

  useEffect(() => {
    if (pointLists?.data) {
      setLoading(false);
    }
  }, [pointLists?.data]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setLoading(true);
    router.push(`/points?page=${value}&limit=${limit}`);
    setCurrentPage(value);
  };
  return (
    <div>
      {loading ? (
        <div>
          <Skeleton height={"120px"} animation="wave" />
          <Skeleton height={"120px"} animation="wave" />
          <Skeleton height={"120px"} animation={"wave"} />
          <Skeleton height={"120px"} animation={"wave"} />
        </div>
      ) : (
        <table className="w-full text-left rtl:text-right text-gray-500 ">
          <thead className="  text-center border-b">
            <tr>
              {[
                "Name",
                "Address",
                "Country",
                "Earnings (Points)",
                "Action",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-3  text-base  font-normal ${
                    header === "Name" ? "text-start pl-28" : "text-center"
                  } `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pointLists.data.map((el) => (
              <tr
                key={el._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {el?.userId?.profilePic ? (
                      <Image
                        src={
                          isUrl(el?.userId?.profilePic)
                            ? el?.userId?.profilePic
                            : `/images/user_avator/${el?.userId?.profilePic}@3x.png`
                        }
                        alt={"image"}
                        width={70}
                        height={70}
                        className="border-[3px] border-white rounded-full shadow-md"
                      />
                    ) : (
                      <Image
                        src={
                          "https://res.cloudinary.com/bayshore/image/upload/v1681031967/default_avatar_pxnxzs.png"
                        }
                        alt={"image"}
                        width={70}
                        height={70}
                        className="border-[3px] border-white rounded-full shadow-md"
                      />
                    )}

                    <div className="flex flex-col justify-center items-start gap-1">
                      <h4 className="text-xl font-semibold">
                        {el?.userId?.name || "unknown"}
                      </h4>
                      <span className="text-gray-400 text-sm font-normal">
                        {el?.userId?.primaryMicrositeEns || "N/A"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4">{el?.userId?.address || "N/A"}</td>
                <td className="px-4">{el?.userId?.country || "N/A"}</td>
                <td className="px-4">{el?.availablePoints}</td>
                <td>
                  <Link
                    href={`/points/${el?._id}`}
                    className="px-4 py-2 bg-transparent text-black border border-black text-base font-normal  flex items-center gap-2 h-10 max-w-32"
                  >
                    View Points
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center items-center mt-4">
        <Pagination
          count={pointLists.pagination.totalPages} // Total number of pages
          page={currentPage} // Current active page
          onChange={handlePageChange} // Handler for page change
          color="primary" // You can change the color (e.g., "secondary")
          shape="rounded" // Rounded pagination buttons
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "1rem", // Customize font size
              fontWeight: "bold", // Customize font weight
            },
          }}
        />
      </div>
    </div>
  );
};

export default PointsLists;
