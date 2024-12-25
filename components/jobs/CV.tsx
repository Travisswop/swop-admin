import Link from "next/link";
import React from "react";
import { TbFileCv } from "react-icons/tb";

const cvData = [
  {
    name: "Tasnim Borsha",
    date: "2023-08-05",
    cvLink: "/cvs/tasnim-borsha-cv.pdf",
  },
  {
    name: "Nasim Reza",
    date: "2023-08-05",
    cvLink: "/cvs/nasim-reza-cv.pdf",
  },
  {
    name: "Abdullah Isha",
    date: "2023-08-05",
    cvLink: "/cvs/abdullah-isha-cv.pdf",
  },
  {
    name: "Sadit Ahsan",
    date: "2023-08-05",
    cvLink: "/cvs/sadit-ahsan-cv.pdf",
  },
];

const CV = () => {
  return (
    <div className="p-10 bg-white min-h-fit h-full">
      {cvData.map((cv, index) => (
        <div
          key={index}
          className="flex gap-4 justify-between items-end py-6 border-b"
        >
          <div className="flex items-start gap-3">
            <TbFileCv className="text-4xl text-[#2B2B2B]" />
            <div>
              <h4 className="text-3xl font-medium mb-1 text-[#2B2B2B]">
                {cv.name}
              </h4>
              <p className="text-xl font-normal text-[#838383]">{cv.date}</p>
            </div>
          </div>
          <div>
            <Link
              href={cv.cvLink}
              download=""
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
