"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const page = () => {
  return (
    <div className="p-8 text-black bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Reward earnings rate</h2>
        <Button variant={"default"}>Edit Points</Button>
      </div>
      <div className="flex justify-between items-center gap-10">
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
                <TableCell align="left" style={{ maxWidth: 200 }}>
                  <span className="w-1/3 -translate-x-5">Name</span>
                </TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, i) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={i}
                  className="hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out h-10"
                >
                  <TableCell align="left" className="h-full"></TableCell>

                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
                <TableCell align="left" style={{ maxWidth: 200 }}>
                  <span className="w-1/3 -translate-x-5">Name</span>
                </TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, i) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={i}
                  className="hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out h-10"
                >
                  <TableCell align="left" className="h-full"></TableCell>

                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default page;
