"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaSearch } from "react-icons/fa";

import { Avatar, Button, Popover } from "@mui/material";

//imported data for table
import data from "@/lib/placeholderData";

import { Row } from "@/lib/placeholderData";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  // console.log(dynamicData[0].userReferralState);

  //FLOATING BUTTON

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
        <h2 className="text-xl 2xl:text-4xl font-semibold pl-5">User Points</h2>

        <div className="w-96 relative">
          <input
            type="text"
            className="px-3 py-2 bg-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
            placeholder="Search here..."
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
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
              <TableCell align="center" style={{ maxWidth: 200 }}>
                <span className="w-1/3 -translate-x-5">Name</span>
              </TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Country </TableCell>
              <TableCell align="center">{`Earnings (Points)`}</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={row.id}
                className="hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out h-28"
              >
                <TableCell
                  align="left"
                  className="h-full"
                  onClick={() => router.push(`/points/${row.id}`)}
                >
                  <div className="flex items-center gap-6 relative left-1/3 h-16 w-full">
                    <Avatar
                      alt={row.image.split("/")[-1]}
                      src={row.image}
                      className="scale-150 "
                    />

                    {/* <Avatar>R</Avatar> */}
                    <div className="flex flex-col gap-1">
                      <h5 className="text-lg text-black">{row.name}</h5>
                      <h6>{row.swopId}</h6>
                    </div>
                  </div>
                </TableCell>

                <TableCell
                  align="center"
                  onClick={() => router.push(`/points/${row.id}`)}
                >
                  {row.address}
                </TableCell>

                <TableCell
                  align="center"
                  onClick={() => router.push(`/points/${row.id}`)}
                >
                  {row.country}
                </TableCell>

                <TableCell
                  align="center"
                  onClick={() => router.push(`/points/${row.id}`)}
                >
                  {row.earnings_points}
                </TableCell>

                <TableCell align="center">
                  <Button
                    aria-describedby={id}
                    variant="outlined"
                    className="!text-red-500 !border-red-500"
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    Reset Points
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
                        padding: "10px",
                      },
                    }}
                  >
                    Display Confirm massage or button here
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Page;
