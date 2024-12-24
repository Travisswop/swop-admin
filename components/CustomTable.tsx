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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdOutlineFileDownload } from "react-icons/md";

type Row = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

export default function CustomTable({
  sideText,
  dynamicData,
}: {
  sideText: string;
  dynamicData: Row[];
}) {
  const [date, setDate] = React.useState("");
  const [name, setName] = React.useState("");

  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };
  const handleChangeAge = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };

  return (
    <section className="w-full max-h-[90%] text-black overflow-scroll-y bg-white p-4 flex flex-col gap-5 rounded-lg">
      <div className="flex justify-between items-center w-full">
        {sideText && <div>{sideText}</div>}
        <div className="w-96 relative">
          <input
            type="text"
            className="px-3 py-2 bg-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
            placeholder="Search here..."
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
        </div>
        <div className="flex flex-row gap-4 w-fit justify-center items-center">
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
      </div>
      <TableContainer
        component={Paper}
        //fix shadow
        className="px-4"
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="relative border-none"
        >
          <TableHead className="">
            <TableRow className="sticky top-0 z-20 bg-white">
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Booking Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dynamicData.map((row: Row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
