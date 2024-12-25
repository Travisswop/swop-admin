import Link from "next/link";
import React from "react";
import { TbFileCv } from "react-icons/tb";

const cvData = [
  {
    name: "Tasnim Borsha",
    date: "2023-08-05",
    cvLink: "",
  },
  {
    name: "Nasim Reza",
    date: "2023-08-05",
    cvLink: "",
  },
  {
    name: "Abdullah Isha",
    date: "2023-08-05",
    cvLink: "",
  },
  {
    name: "Sadit Ahsan",
    date: "2023-08-05",
    cvLink: "",
  },
];

const CV = () => {
  return (
    <div className="p-10 bg-white min-h-svh h-full">
      {cvData.map((cv, index) => (
        <div
          key={index}
          className="flex gap-4 justify-between items-center py-6 border-b"
        >
          <div className="flex items-start gap-3">
            <TbFileCv className="text-2xl text-[#2B2B2B]" />
            <div>
              <h4 className="text-xl font-medium mb-1 text-[#2B2B2B]">
                {cv.name}
              </h4>
              <p className="text-base font-normal text-[#838383]">{cv.date}</p>
            </div>
          </div>
          <div>
            <Link
              href={cv.cvLink}
              download={cv.cvLink}
              className="flex items-center justify-center w-48 py-2 text-base font-medium text-white bg-black border border-black rounded text-center"
            >
              Download CV
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CV;
