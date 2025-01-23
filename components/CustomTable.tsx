"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdOutlineFileDownload } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Avatar, Button, Popover } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
// import swopLogo from "@/public/images/swop-logo.png";
// import Image from "next/image";

type Row = {
  id: number;
  name: string;
  email: string;
  image: string;
  date: string;
  reference?: string;
  referrals?: string;
  earned?: number;
  payStatus?: boolean;
  phone?: string;
  bookingTime?: string;
  userReferralState?: boolean;
  address: string;
  profession: string;
  swopId: string;
};

export default function CustomTable({
  sideText,
  dynamicData,
  showSearch,
  clickAble,
  clickPath,
  user,
  referrals,
  swopId,
  subscribers,
}: {
  sideText: string;
  dynamicData: Row[];
  showSearch: boolean;
  clickAble?: boolean;
  clickPath?: string;
  user?: boolean;
  userReferralState?: boolean;
  referrals?: boolean;
  swopId?: boolean;
  subscribers?: boolean;
}) {
  const router = useRouter();
  // console.log(dynamicData[0].userReferralState);

  const [date, setDate] = React.useState("");
  const [name, setName] = React.useState("");
  const [referralState, setReferralState] = React.useState(true);
  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };
  const handleChangeAge = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };
  //FLOATING BUTTON

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    state: boolean,
  ) => {
    setReferralState(state);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //FLOATING BUTTON

  //React.useEffect(() => {}, [dynamicData]);

  return (
    <section className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg">
      <article className="flex justify-between items-center w-full gap-4">
        {sideText && (
          <h2 className="text-xl 2xl:text-4xl font-semibold pl-5">
            {sideText}
          </h2>
        )}
        {showSearch && (
          <div className="w-96 relative">
            <input
              type="text"
              className="px-3 py-2 bg-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
              placeholder="Search here..."
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          </div>
        )}
        <div
          className={cn(
            "flex flex-row gap-2 2xl:gap-4 w-fit justify-center items-center ",
            showSearch ? "" : "ml-auto",
          )}
        >
          <h2>Filter</h2>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label" className="text-sm p-0">
              Date
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={date}
              label="Date"
              onChange={handleChangeAge}
            >
              <MenuItem value={"ascending"}>Ascending</MenuItem>
              <MenuItem value={"descending"}>Descending</MenuItem>
            </Select>
          </FormControl>

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
      <TableContainer
        component={Paper}
        //fix shadow
        className="px-4"
      >
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
          className="relative border-none"
        >
          <TableHead className="">
            <TableRow className="sticky top-0 z-20 bg-white">
              {user ? (
                <TableCell align="center">Date</TableCell>
              ) : swopId ? (
                <TableCell>User ID</TableCell>
              ) : (
                <TableCell>ID</TableCell>
              )}

              <TableCell align="center" style={{ maxWidth: 200 }}>
                <span className="w-1/3 -translate-x-5">Name</span>
              </TableCell>

              {referrals ? (
                <TableCell align="left">Referrals</TableCell>
              ) : swopId ? (
                <TableCell align="center">Profession</TableCell>
              ) : subscribers ? (
                <TableCell align="center">Subscribers Email</TableCell>
              ) : user ? (
                <TableCell align="left">Email</TableCell>
              ) : (
                <TableCell align="center">Profession</TableCell>
              )}

              {referrals ? (
                <TableCell align="left">{`Earned Amount ($)`}</TableCell>
              ) : user ? (
                <TableCell align="left">Reference</TableCell>
              ) : swopId ? (
                <TableCell align="center">Address</TableCell>
              ) : subscribers ? (
                <TableCell align="center"></TableCell>
              ) : user ? (
                <TableCell align="center">Phone Number</TableCell>
              ) : (
                <TableCell align="center">Address</TableCell>
              )}

              {referrals ? (
                <TableCell align="center">Status</TableCell>
              ) : user ? (
                <TableCell align="center">Edit</TableCell>
              ) : swopId ? (
                <TableCell align="center">Swop ID</TableCell>
              ) : subscribers ? (
                <TableCell align="center"></TableCell>
              ) : (
                <TableCell align="center"></TableCell>
              )}

              {referrals && <TableCell align="center">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {dynamicData.map((row: Row) =>
              clickAble ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id}
                  onClick={() => router.push(`${clickPath}/${row.id}`)}
                  className="hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out"
                >
                  {user ? (
                    <TableCell component="th" scope="row" align="center">
                      {row.date}
                    </TableCell>
                  ) : (
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                  )}
                  <TableCell align="left">
                    <div className="flex items-center gap-2 relative left-1/3">
                      <Avatar alt={row.image.split("/")[-1]} src={row.image} />

                      {/* <Avatar>R</Avatar> */}
                      <h6>{row.name}</h6>
                    </div>
                  </TableCell>
                  {referrals ? (
                    <TableCell align="center">{row.referrals}</TableCell>
                  ) : swopId ? (
                    <TableCell align="center">{row.profession}</TableCell>
                  ) : (
                    <TableCell align="left">{row.email}</TableCell>
                  )}
                  {referrals ? (
                    <TableCell align="center">{row.earned}</TableCell>
                  ) : user ? (
                    <TableCell align="left">{row.reference}</TableCell>
                  ) : swopId ? (
                    <TableCell align="center">{row.address}</TableCell>
                  ) : (
                    <TableCell align="center">{row.phone}</TableCell>
                  )}
                  {referrals ? (
                    <TableCell align="center">
                      {row.payStatus ? (
                        <span className="text-green-500">Paid</span>
                      ) : (
                        <span className="text-red-500">Pending</span>
                      )}
                    </TableCell>
                  ) : user ? (
                    <TableCell align="center">
                      <FaRegEdit className="h-5 w-5 m-auto" />
                    </TableCell>
                  ) : swopId ? (
                    <TableCell align="center">{row.swopId}</TableCell>
                  ) : (
                    <TableCell align="center">{row.bookingTime}</TableCell>
                  )}
                  {referrals && (
                    <TableCell align="center" className="hover:text-blue-500">
                      <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={(event) =>
                          handleClick(event, row.userReferralState || true)
                        }
                      >
                        <CiMenuKebab className="h-6 w-6 m-auto " />
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                      >
                        The content of the Popover.
                      </Popover>
                    </TableCell>
                  )}
                </TableRow>
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id}
                  //onClick={() => router.push(`${clickPath}/${row.id}`)}
                  className="hover:bg-gray-100  transition-all duration-200 ease-in-out"
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>

                  <TableCell align="left">
                    <div className="flex items-center gap-2 relative left-1/3">
                      <Avatar alt={row.image.split("/")[-1]} src={row.image} />
                      {/* <Avatar>R</Avatar> */}
                      <h6>{row.name}</h6>
                    </div>
                  </TableCell>

                  {user ? (
                    <TableCell align="center">{row.email}</TableCell>
                  ) : referrals ? (
                    <TableCell align="left">{row.referrals}</TableCell>
                  ) : subscribers ? (
                    <TableCell align="center">{row.email}</TableCell>
                  ) : (
                    <TableCell align="center">{row.profession}</TableCell>
                  )}

                  {referrals ? (
                    <TableCell align="left">{`$ ${row.earned}`}</TableCell>
                  ) : user ? (
                    <TableCell align="center">{row.reference}</TableCell>
                  ) : swopId ? (
                    <TableCell align="center">{row.address}</TableCell>
                  ) : subscribers ? (
                    <TableCell align="center"></TableCell>
                  ) : user ? (
                    <TableCell align="center">{row.phone}</TableCell>
                  ) : (
                    <TableCell align="center">{row.address}</TableCell>
                  )}

                  {referrals ? (
                    <TableCell align="center">
                      {row.payStatus === true ? (
                        <span className="text-green-500">Paid</span>
                      ) : (
                        <span className="text-[#e0a64e]">Pending</span>
                      )}
                    </TableCell>
                  ) : subscribers ? (
                    <TableCell align="center"></TableCell>
                  ) : (
                    <TableCell align="center"></TableCell>
                  )}
                  {referrals && (
                    <TableCell align="center" className="hover:text-blue-500">
                      <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={(event) =>
                          handleClick(event, row.userReferralState || true)
                        }
                        sx={{
                          bgcolor: "transparent",
                          color: "black",
                          boxShadow: "none",
                          "&:hover": {
                            bgcolor: "transparent",
                            color: "black",
                            boxShadow: "none",
                          },
                        }}
                      >
                        <CiMenuKebab className="h-6 w-6 m-auto " />
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        sx={{
                          bgcolor: "transparent",
                          boxShadow: "none",
                          "& .MuiPopover-paper": {
                            bgcolor: "white",
                            boxShadow: "none",
                            border: 1,
                            borderRadius: "10px",
                            borderStyle: "solid",
                            borderColor: "#e2e8f0",
                          },
                        }}
                      >
                        <div className="p-2">
                          <div className="flex flex-col justify-start items-center divide-y bg-white w-28">
                            <button
                              className={cn(
                                "p-2 flex justify-start items-center",
                                referralState === true ? "text-green-500" : "",
                              )}
                              onClick={() => {
                                // e.preventDefault();
                                // dynamicData[row.id].userReferralState = true;

                                setReferralState(true);
                              }}
                            >
                              {referralState === true && (
                                <IoMdCheckmark className="h-5 w-5" />
                              )}{" "}
                              Active
                            </button>
                            <button
                              className={cn(
                                "p-2 flex justify-start items-center",
                                referralState === false ? "text-red-500" : "",
                              )}
                              onClick={() => {
                                // e.preventDefault();
                                // console.log(row.id);
                                // dynamicData[row.id].userReferralState = false;
                                setReferralState(false);
                              }}
                            >
                              {referralState === false && (
                                <IoMdCheckmark className="h-5 w-5" />
                              )}{" "}
                              Deactivate
                            </button>
                          </div>
                        </div>
                      </Popover>
                    </TableCell>
                  )}
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
