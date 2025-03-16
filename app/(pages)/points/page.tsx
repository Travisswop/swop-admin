import { getPointsLists } from "@/action/swopId";
import isUrl from "@/components/util/isUrl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

const usersPoints = [
  {
    id: 1,
    name: "Hamid Hasan",
    username: "Hamid.Swopple.ID",
    address: "6391 Elgin St. Celina",
    country: "Australia",
    points: 20,
    image:
      "https://img.freepik.com/free-photo/portrait-elegant-professional-businesswoman_23-2150917246.jpg?w=740",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "Sarah.Swopple.ID",
    address: "12 Oakwood Ave, Toronto",
    country: "Canada",
    points: 35,
    image:
      "https://img.freepik.com/free-photo/confident-young-businesswoman-glasses_23-2148197620.jpg?w=740",
  },
  {
    id: 3,
    name: "Michael Brown",
    username: "Michael.Swopple.ID",
    address: "780 Sunset Blvd, Los Angeles",
    country: "USA",
    points: 50,
    image:
      "https://img.freepik.com/free-photo/young-smiling-businessman-sitting-office_23-2148197599.jpg?w=740",
  },
  {
    id: 4,
    name: "Emily Wilson",
    username: "Emily.Swopple.ID",
    address: "2456 Maple St, London",
    country: "UK",
    points: 18,
    image:
      "https://img.freepik.com/free-photo/successful-businesswoman-smiling-office_23-2148197630.jpg?w=740",
  },
  {
    id: 5,
    name: "John Doe",
    username: "John.Swopple.ID",
    address: "402 Brookline Ave, Boston",
    country: "USA",
    points: 42,
    image:
      "https://img.freepik.com/free-photo/handsome-young-businessman-suit_23-2148197598.jpg?w=740",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    username: "Olivia.Swopple.ID",
    address: "91 Victoria Rd, Sydney",
    country: "Australia",
    points: 28,
    image:
      "https://img.freepik.com/free-photo/portrait-happy-businesswoman-sitting-office_23-2148197631.jpg?w=740",
  },
];

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PointsPage = async ({ searchParams }: PageProps) => {
  const token = (await cookies()).get("authToken")?.value;
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 10;
  const pointLists = await getPointsLists(token || "", page, limit);
  console.log("points lists", pointLists);
  return (
    <div className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg py-10">
      <article className="flex justify-between items-center w-full gap-4">
        <h2 className="text-xl 2xl:text-2xl font-semibold pl-5">User Points</h2>
        <div className="w-96 relative">
          <input
            type="text"
            className="px-3 py-2 bg-[#F1F8FF] rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
            placeholder="Search here..."
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
        </div>
      </article>
      <table className="w-full text-left rtl:text-right text-gray-500 ">
        <thead className="  text-center border-b">
          <tr>
            {["Name", "Address", "Country", "Earnings (Points)", "Action"].map(
              (header, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-3  text-base  font-normal ${
                    header === "Name" ? "text-start pl-28" : "text-center"
                  } `}
                >
                  {header}
                </th>
              )
            )}
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
                  <div className="flex flex-col justify-center items-start gap-1">
                    <h4 className="text-xl font-semibold">
                      {el?.userId?.name || "N/A"}
                    </h4>
                    <span className="text-gray-400 text-sm font-normal">
                      {"N/A"}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4">{el?.userId?.address}</td>
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
    </div>
  );
};

export default PointsPage;
