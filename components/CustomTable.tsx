// "use client";
// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { FaRegEdit, FaSearch } from "react-icons/fa";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";
// import { Avatar, Button, Popover } from "@mui/material";
// import { CiMenuKebab } from "react-icons/ci";
// import { IoMdCheckmark } from "react-icons/io";
// // import swopLogo from "@/public/images/swop-logo.png";
// // import Image from "next/image";

// type Row = {
//   id: number;
//   name: string;
//   email: string;
//   image: string;
//   date: string;
//   reference?: string;
//   referrals?: string;
//   earned?: number;
//   payStatus?: boolean;
//   phone?: string;
//   bookingTime?: string;
//   userReferralState?: boolean;
//   address: string;
//   profession: string;
//   swopId: string;
// };

// export default function CustomTable({
//   sideText,
//   dynamicData,
//   showSearch,
//   clickAble,
//   clickPath,
//   user,
//   referrals,
//   swopId,
//   subscribers,
// }: {
//   sideText: string;
//   dynamicData: Row[];
//   showSearch: boolean;
//   clickAble?: boolean;
//   clickPath?: string;
//   user?: boolean;
//   userReferralState?: boolean;
//   referrals?: boolean;
//   swopId?: boolean;
//   subscribers?: boolean;
// }) {
//   const router = useRouter();
//   // console.log(dynamicData[0].userReferralState);

//   const [date, setDate] = React.useState("");
//   const [name, setName] = React.useState("");
//   const [referralState, setReferralState] = React.useState(true);
//   const handleChangeName = (event: SelectChangeEvent) => {
//     setName(event.target.value as string);
//   };
//   const handleChangeAge = (event: SelectChangeEvent) => {
//     setDate(event.target.value as string);
//   };
//   //FLOATING BUTTON

//   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
//     null,
//   );

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     state: boolean,
//   ) => {
//     setReferralState(state);
//     setAnchorEl(event.currentTarget);
//   };

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
//         {sideText && (
//           <h2 className="text-xl 2xl:text-4xl font-semibold pl-5">
//             {sideText}
//           </h2>
//         )}
//         {showSearch && (
//           <div className="w-96 relative">
//             <input
//               type="text"
//               className="px-3 py-2 bg-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
//               placeholder="Search here..."
//             />
//             <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
//           </div>
//         )}
//         <div
//           className={cn(
//             "flex flex-row gap-2 2xl:gap-4 w-fit justify-center items-center ",
//             showSearch ? "" : "ml-auto",
//           )}
//         >
//           <h2>Filter</h2>

//           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//             <InputLabel id="demo-select-small-label" className="text-sm p-0">
//               Date
//             </InputLabel>
//             <Select
//               labelId="demo-select-small-label"
//               id="demo-select-small"
//               value={date}
//               label="Date"
//               onChange={handleChangeAge}
//             >
//               <MenuItem value={"ascending"}>Ascending</MenuItem>
//               <MenuItem value={"descending"}>Descending</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//             <InputLabel id="demo-select-small-label">Name</InputLabel>
//             <Select
//               labelId="demo-select-small-label"
//               id="demo-select-small"
//               value={name}
//               label="Name"
//               onChange={handleChangeName}
//               className="text-sm p-0"
//             >
//               <MenuItem value={"ascending"} className="p-0">
//                 Ascending
//               </MenuItem>
//               <MenuItem value={"descending"}>Descending</MenuItem>
//             </Select>
//           </FormControl>

//           <button className="text-white h-full bg-black px-4 py-2 rounded-xl w-28 flex justify-center items-center">
//             <span>Export</span>&nbsp;{" "}
//             <MdOutlineFileDownload className="h-5 w-5" />
//           </button>
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
//               {user ? (
//                 <TableCell align="center">Date</TableCell>
//               ) : swopId ? (
//                 <TableCell>User ID</TableCell>
//               ) : (
//                 <TableCell>ID</TableCell>
//               )}

//               <TableCell align="center" style={{ maxWidth: 200 }}>
//                 <span className="w-1/3 -translate-x-5">Name</span>
//               </TableCell>

//               {referrals ? (
//                 <TableCell align="left">Referrals</TableCell>
//               ) : swopId ? (
//                 <TableCell align="center">Profession</TableCell>
//               ) : subscribers ? (
//                 <TableCell align="center">Subscribers Email</TableCell>
//               ) : user ? (
//                 <TableCell align="left">Email</TableCell>
//               ) : (
//                 <TableCell align="center">Profession</TableCell>
//               )}

//               {referrals ? (
//                 <TableCell align="left">{`Earned Amount ($)`}</TableCell>
//               ) : user ? (
//                 <TableCell align="left">Reference</TableCell>
//               ) : swopId ? (
//                 <TableCell align="center">Address</TableCell>
//               ) : subscribers ? (
//                 <TableCell align="center"></TableCell>
//               ) : user ? (
//                 <TableCell align="center">Phone Number</TableCell>
//               ) : (
//                 <TableCell align="center">Address</TableCell>
//               )}

//               {referrals ? (
//                 <TableCell align="center">Status</TableCell>
//               ) : user ? (
//                 <TableCell align="center">Edit</TableCell>
//               ) : swopId ? (
//                 <TableCell align="center">Swop ID</TableCell>
//               ) : subscribers ? (
//                 <TableCell align="center"></TableCell>
//               ) : (
//                 <TableCell align="center"></TableCell>
//               )}

//               {referrals && <TableCell align="center">Action</TableCell>}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {dynamicData.map((row: Row) =>
//               clickAble ? (
//                 <TableRow
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   key={row.id}
//                   onClick={() => router.push(`${clickPath}/${row.id}`)}
//                   className="hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out"
//                 >
//                   {user ? (
//                     <TableCell component="th" scope="row" align="center">
//                       {row.date}
//                     </TableCell>
//                   ) : (
//                     <TableCell component="th" scope="row">
//                       {row.id}
//                     </TableCell>
//                   )}
//                   <TableCell align="left">
//                     <div className="flex items-center gap-2 relative left-1/3">
//                       <Avatar alt={row.image.split("/")[-1]} src={row.image} />

//                       {/* <Avatar>R</Avatar> */}
//                       <h6>{row.name}</h6>
//                     </div>
//                   </TableCell>
//                   {referrals ? (
//                     <TableCell align="center">{row.referrals}</TableCell>
//                   ) : swopId ? (
//                     <TableCell align="center">{row.profession}</TableCell>
//                   ) : (
//                     <TableCell align="left">{row.email}</TableCell>
//                   )}
//                   {referrals ? (
//                     <TableCell align="center">{row.earned}</TableCell>
//                   ) : user ? (
//                     <TableCell align="left">{row.reference}</TableCell>
//                   ) : swopId ? (
//                     <TableCell align="center">{row.address}</TableCell>
//                   ) : (
//                     <TableCell align="center">{row.phone}</TableCell>
//                   )}
//                   {referrals ? (
//                     <TableCell align="center">
//                       {row.payStatus ? (
//                         <span className="text-green-500">Paid</span>
//                       ) : (
//                         <span className="text-red-500">Pending</span>
//                       )}
//                     </TableCell>
//                   ) : user ? (
//                     <TableCell align="center">
//                       <FaRegEdit className="h-5 w-5 m-auto" />
//                     </TableCell>
//                   ) : swopId ? (
//                     <TableCell align="center">{row.swopId}</TableCell>
//                   ) : (
//                     <TableCell align="center">{row.bookingTime}</TableCell>
//                   )}
//                   {referrals && (
//                     <TableCell align="center" className="hover:text-blue-500">
//                       <Button
//                         aria-describedby={id}
//                         variant="contained"
//                         onClick={(event) =>
//                           handleClick(event, row.userReferralState || true)
//                         }
//                       >
//                         <CiMenuKebab className="h-6 w-6 m-auto " />
//                       </Button>
//                       <Popover
//                         id={id}
//                         open={open}
//                         anchorEl={anchorEl}
//                         onClose={handleClose}
//                         anchorOrigin={{
//                           vertical: "center",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "center",
//                           horizontal: "right",
//                         }}
//                       >
//                         The content of the Popover.
//                       </Popover>
//                     </TableCell>
//                   )}
//                 </TableRow>
//               ) : (
//                 <TableRow
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   key={row.id}
//                   //onClick={() => router.push(`${clickPath}/${row.id}`)}
//                   className="hover:bg-gray-100  transition-all duration-200 ease-in-out"
//                 >
//                   <TableCell component="th" scope="row">
//                     {row.id}
//                   </TableCell>

//                   <TableCell align="left">
//                     <div className="flex items-center gap-2 relative left-1/3">
//                       <Avatar alt={row.image.split("/")[-1]} src={row.image} />
//                       {/* <Avatar>R</Avatar> */}
//                       <h6>{row.name}</h6>
//                     </div>
//                   </TableCell>

//                   {user ? (
//                     <TableCell align="center">{row.email}</TableCell>
//                   ) : referrals ? (
//                     <TableCell align="left">{row.referrals}</TableCell>
//                   ) : subscribers ? (
//                     <TableCell align="center">{row.email}</TableCell>
//                   ) : (
//                     <TableCell align="center">{row.profession}</TableCell>
//                   )}

//                   {referrals ? (
//                     <TableCell align="left">{`$ ${row.earned}`}</TableCell>
//                   ) : user ? (
//                     <TableCell align="center">{row.reference}</TableCell>
//                   ) : swopId ? (
//                     <TableCell align="center">{row.address}</TableCell>
//                   ) : subscribers ? (
//                     <TableCell align="center"></TableCell>
//                   ) : user ? (
//                     <TableCell align="center">{row.phone}</TableCell>
//                   ) : (
//                     <TableCell align="center">{row.address}</TableCell>
//                   )}

//                   {referrals ? (
//                     <TableCell align="center">
//                       {row.payStatus === true ? (
//                         <span className="text-green-500">Paid</span>
//                       ) : (
//                         <span className="text-[#e0a64e]">Pending</span>
//                       )}
//                     </TableCell>
//                   ) : subscribers ? (
//                     <TableCell align="center"></TableCell>
//                   ) : (
//                     <TableCell align="center"></TableCell>
//                   )}
//                   {referrals && (
//                     <TableCell align="center" className="hover:text-blue-500">
//                       <Button
//                         aria-describedby={id}
//                         variant="contained"
//                         onClick={(event) =>
//                           handleClick(event, row.userReferralState || true)
//                         }
//                         sx={{
//                           bgcolor: "transparent",
//                           color: "black",
//                           boxShadow: "none",
//                           "&:hover": {
//                             bgcolor: "transparent",
//                             color: "black",
//                             boxShadow: "none",
//                           },
//                         }}
//                       >
//                         <CiMenuKebab className="h-6 w-6 m-auto " />
//                       </Button>
//                       <Popover
//                         id={id}
//                         open={open}
//                         anchorEl={anchorEl}
//                         onClose={handleClose}
//                         anchorOrigin={{
//                           vertical: "center",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "center",
//                           horizontal: "right",
//                         }}
//                         sx={{
//                           bgcolor: "transparent",
//                           boxShadow: "none",
//                           "& .MuiPopover-paper": {
//                             bgcolor: "white",
//                             boxShadow: "none",
//                             border: 1,
//                             borderRadius: "10px",
//                             borderStyle: "solid",
//                             borderColor: "#e2e8f0",
//                           },
//                         }}
//                       >
//                         <div className="p-2">
//                           <div className="flex flex-col justify-start items-center divide-y bg-white w-28">
//                             <button
//                               className={cn(
//                                 "p-2 flex justify-start items-center",
//                                 referralState === true ? "text-green-500" : "",
//                               )}
//                               onClick={() => {
//                                 // e.preventDefault();
//                                 // dynamicData[row.id].userReferralState = true;

//                                 setReferralState(true);
//                               }}
//                             >
//                               {referralState === true && (
//                                 <IoMdCheckmark className="h-5 w-5" />
//                               )}{" "}
//                               Active
//                             </button>
//                             <button
//                               className={cn(
//                                 "p-2 flex justify-start items-center",
//                                 referralState === false ? "text-red-500" : "",
//                               )}
//                               onClick={() => {
//                                 // e.preventDefault();
//                                 // console.log(row.id);
//                                 // dynamicData[row.id].userReferralState = false;
//                                 setReferralState(false);
//                               }}
//                             >
//                               {referralState === false && (
//                                 <IoMdCheckmark className="h-5 w-5" />
//                               )}{" "}
//                               Deactivate
//                             </button>
//                           </div>
//                         </div>
//                       </Popover>
//                     </TableCell>
//                   )}
//                 </TableRow>
//               ),
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </section>
//   );
// }
"use client";
// import { Box, Modal } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaDownload } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
// import IndividualUserInformation from "./swopId/IndividualUserInformation";
// import TransactionHistory from "./swopId/TransactionHistory";
// import SmartSites from "./swopId/SmartSites";

const demoTableData = [
  {
    id: 1,
    name: "Hamida Hasan",
    username: "Hamida.Swopple.ID",
    address: "0xB4Fh3466...67Xd",
    code: "8hg4xcvv",
    image:
      "https://img.freepik.com/free-photo/portrait-elegant-professional-businesswoman_23-2150917246.jpg?t=st=1741512909~exp=1741516509~hmac=234907dc23cab8311b9c0bdf724cebec486b814bda168cf2f988a97577d5faf9&w=740",
  },
  {
    id: 2,
    name: "John Doe",
    username: "John.Swopple.ID",
    address: "0xA3Gh6572...88Yt",
    code: "7as3sdvf",
    image:
      "https://img.freepik.com/free-photo/handsome-young-businessman-suit_23-2148197598.jpg?w=740",
  },
  {
    id: 3,
    name: "Sarah Adams",
    username: "Sarah.Swopple.ID",
    address: "0xF9Jk1234...77Wx",
    code: "5xy7tuvw",
    image:
      "https://img.freepik.com/free-photo/confident-young-businesswoman-glasses_23-2148197620.jpg?w=740",
  },
  {
    id: 4,
    name: "Michael Brown",
    username: "Michael.Swopple.ID",
    address: "0xM1Nk5678...99Zx",
    code: "4pq9lmno",
    image:
      "https://img.freepik.com/free-photo/young-smiling-businessman-sitting-office_23-2148197599.jpg?w=740",
  },
  {
    id: 5,
    name: "Emily Wilson",
    username: "Emily.Swopple.ID",
    address: "0xXyZk9876...55Qr",
    code: "3mn8abcs",
    image:
      "https://img.freepik.com/free-photo/successful-businesswoman-smiling-office_23-2148197630.jpg?w=740",
  },
];

const CustomTable = () => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const style = {
  //   position: "absolute",
  //   color: "black",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "auto", // Allow width to adjust based on content
  //   maxWidth: "90%", // Optional: Limits the width to 90% of the viewport width
  //   bgcolor: "background.paper",
  //   // border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  //   borderRadius: "16px",
  // };

  return (
    <div className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg py-10">
      <article className="flex justify-end items-end w-full gap-4 px-4">
        <div className="flex items-center gap-4">
          <h4 className="">Filter</h4>

          {/* <form className="max-w-sm mx-auto">
            <div className="relative">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 pr-10 appearance-none h-10 max-w-32"
              >
                <option selected>Date</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </div>
            </div>
          </form> */}

          <form className="max-w-sm mx-auto">
            <div className="relative">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full p-2.5 pr-10 appearance-none h-10 max-w-32"
              >
                <option selected>Name</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                ▼
              </div>
            </div>
          </form>

          <a
            href="#"
            className="px-4 py-2 bg-black text-white text-base font-normal rounded-lg flex items-center gap-2 h-10 max-w-32"
          >
            Export <FaDownload />
          </a>
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
        {/* Modal */}
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="p-4 bg-white  text-black h-[80vh] overflow-y-scroll">
              <div className="grid grid-cols-2  gap-8 w-full mb-10 ">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    User Information
                  </h3>
                  <IndividualUserInformation />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    Transaction History
                  </h3>
                  <TransactionHistory />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  Smartsites
                </h3>
                <SmartSites />
              </div>
            </div>
          </Box>
        </Modal> */}
      </table>
    </div>
  );
};

export default CustomTable;
