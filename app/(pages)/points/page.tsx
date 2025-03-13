// "use client";
// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { FaSearch } from "react-icons/fa";

// import { Avatar, Button, Popover } from "@mui/material";

// //imported data for table
// import data from "@/lib/placeholderData";

// import { Row } from "@/lib/placeholderData";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const router = useRouter();
//   // console.log(dynamicData[0].userReferralState);

//   //FLOATING BUTTON

//   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
//     null
//   );

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;
//   //FLOATING BUTTON

//   //React.useEffect(() => {}, [dynamicData]);

//   return (
//     <section className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg">
//       <article className="flex justify-between items-center w-full gap-4">
//         <h2 className="text-xl 2xl:text-4xl font-semibold pl-5">User Points</h2>

//         <div className="w-96 relative">
//           <input
//             type="text"
//             className="px-3 py-2 bg-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
//             placeholder="Search here..."
//           />
//           <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
//         </div>
//       </article>
//       <TableContainer
//         component={Paper}
//         //fix shadow
//         className="px-4"
//       >
//         <Table
//           sx={{ minWidth: 650 }}
//           size="small"
//           aria-label="a dense table"
//           className="relative border-none"
//         >
//           <TableHead className="">
//             <TableRow className="sticky top-0 z-20 bg-white">
//               <TableCell align="center" style={{ maxWidth: 200 }}>
//                 <span className="w-1/3 -translate-x-5">Name</span>
//               </TableCell>
//               <TableCell align="center">Address</TableCell>
//               <TableCell align="center">Country </TableCell>
//               <TableCell align="center">{`Earnings (Points)`}</TableCell>
//               <TableCell align="center">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row: Row) => (
//               <TableRow
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 key={row.id}
//                 className="hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out h-28"
//               >
//                 <TableCell
//                   align="left"
//                   className="h-full"
//                   onClick={() => router.push(`/points/${row.id}`)}
//                 >
//                   <div className="flex items-center gap-6 relative left-1/3 h-16 w-full">
//                     <Avatar
//                       alt={row.image.split("/")[-1]}
//                       src={row.image}
//                       className="scale-150 "
//                     />

//                     {/* <Avatar>R</Avatar> */}
//                     <div className="flex flex-col gap-1">
//                       <h5 className="text-lg text-black">{row.name}</h5>
//                       <h6>{row.swopId}</h6>
//                     </div>
//                   </div>
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   onClick={() => router.push(`/points/${row.id}`)}
//                 >
//                   {row.address}
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   onClick={() => router.push(`/points/${row.id}`)}
//                 >
//                   {row.country}
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   onClick={() => router.push(`/points/${row.id}`)}
//                 >
//                   {row.earnings_points}
//                 </TableCell>

//                 <TableCell align="center">
//                   <Button
//                     aria-describedby={id}
//                     variant="outlined"
//                     className="!text-red-500 !border-red-500"
//                     onClick={(event) => {
//                       setAnchorEl(event.currentTarget);
//                     }}
//                   >
//                     Reset Points
//                   </Button>
//                   <Popover
//                     id={id}
//                     open={open}
//                     anchorEl={anchorEl}
//                     onClose={handleClose}
//                     anchorOrigin={{
//                       vertical: "center",
//                       horizontal: "left",
//                     }}
//                     transformOrigin={{
//                       vertical: "center",
//                       horizontal: "right",
//                     }}
//                     sx={{
//                       bgcolor: "transparent",
//                       boxShadow: "none",
//                       "& .MuiPopover-paper": {
//                         bgcolor: "white",
//                         boxShadow: "none",
//                         border: 1,
//                         borderRadius: "10px",
//                         borderStyle: "solid",
//                         borderColor: "#e2e8f0",
//                         padding: "10px",
//                       },
//                     }}
//                   >
//                     Display Confirm massage or button here
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </section>
//   );
// };

// export default Page;

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

const CustomTable = () => {
  return (
    <div className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg py-10">
      <article className="flex justify-between items-center w-full gap-4">
        <h2 className="text-xl 2xl:text-4xl font-semibold pl-5">User Points</h2>
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
          {usersPoints.map((el) => (
            <tr
              key={el.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b text-[16px] font-medium text-gray-800 text-center"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={el.image}
                    alt={el.name}
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
              <td className="px-4">{el.address}</td>
              <td className="px-4">{el.country}</td>
              <td className="px-4">{el.points}</td>
              <td>
                <Link
                  href={`/points/${el.id}`}
                  className="px-4 py-2 bg-transparent text-red-600 border border-red-600 text-base font-normal  flex items-center gap-2 h-10 max-w-32"
                >
                  Reset Points
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
