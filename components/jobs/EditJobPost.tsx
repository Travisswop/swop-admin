import Link from "next/link";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const EditJobPost = () => {
  return (
    <div className="p-10 bg-white min-h-fit h-full overflow-hidden">
      <div>
        {/* Details */}
        <div className="flex items-end justify-between pb-6 border-b">
          <div className="w-full">
            <h6 className="text-xl font-medium mb-2 text-black">Details</h6>
            <p className="text-base text-[#838383]">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="flex gap-5 shrink-0 ">
            <Link
              href="#"
              className=" text-base font-medium py-2 flex justify-center items-center w-44   text-center border border-black rounded text-black "
            >
              Save as draft
            </Link>
            <Link
              href="#"
              className=" text-base font-medium py-2 flex justify-center items-center w-44  text-center border border-black rounded bg-black text-white"
            >
              Publish
            </Link>
          </div>
        </div>
        {/* Job Title */}
        <div className="flex items-start  py-6 border-b gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">Job Title*</h6>
            <p className="text-base text-[#838383]">
              Job titles must describe one position.
            </p>
          </div>
          <div className="w-full gap-5 shrink-0 ">
            <ul className="">
              <li className="w-full">
                <div className="flex items-center ps-3 gap-1">
                  <input id="full-time" type="checkbox" className="w-5 h-5 " />
                  <label
                    htmlFor="full-time"
                    className="w-full py-3 ms-2 text-lg font-medium text-black"
                  >
                    Full Time
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center ps-3 gap-1">
                  <input id="part-time" type="checkbox" className="w-5 h-5 " />
                  <label
                    htmlFor="part-time"
                    className="w-full py-3 ms-2 text-lg font-medium text-black"
                  >
                    Part Time
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center ps-3 gap-1">
                  <input id="contract" type="checkbox" className="w-5 h-5 " />
                  <label
                    htmlFor="contract"
                    className="w-full py-3 ms-2 text-lg font-medium text-black"
                  >
                    Contract
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center ps-3 gap-1">
                  <input id="freelance" type="checkbox" className="w-5 h-5 " />
                  <label
                    htmlFor="freelance"
                    className="w-full py-3 ms-2 text-lg font-medium text-black"
                  >
                    Freelance
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center ps-3 gap-1">
                  <input id="internship" type="checkbox" className="w-5 h-5 " />
                  <label
                    htmlFor="internship"
                    className="w-full py-3 ms-2 text-lg font-medium text-black"
                  >
                    Internship
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Office Location */}
        <div className="flex items-start  py-6 border-b gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">
              Office Location*
            </h6>
            <p className="text-base text-[#838383]">
              Company address goes to this section.
            </p>
          </div>
          <div className="w-full gap-5 shrink-0 ">
            <div className=" flex flex-col gap-4">
              <form className=" max-w-screen-sm">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <GrLocation className="text-black text-2xl" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full py-3 px-4 ps-12 text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900"
                    placeholder="Address..."
                    required
                  />
                </div>
              </form>

              <form className="relative max-w-80">
                <select
                  id="countries"
                  defaultValue=""
                  className="bg-[#F2F2F2] border border-[#EBEBEB] text-gray-900 text-lg rounded-lg focus:ring-transparent focus:border-transparent block w-full py-3 px-4 appearance-none"
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
                <MdOutlineKeyboardArrowDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                  size={24}
                />
              </form>
            </div>
          </div>
        </div>
        {/* Skills */}
        <div className="flex items-start  py-6 border-b gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">Skills*</h6>
            <p className="text-base text-[#838383]">
              Please select skills what you want for your company. These can be
              technologies or experience.
            </p>
          </div>
          <div className="w-full gap-5 shrink-0 ">
            <div className=" flex flex-col gap-4">
              <div className="flex gap-3 items-center">
                <div className=" inline-flex items-center gap-2 bg-black rounded text-white py-2 px-3">
                  <span>
                    <FaXmark />
                  </span>
                  <span>Node Js</span>
                </div>
                <div className=" inline-flex items-center gap-2 bg-black rounded text-white py-2 px-3">
                  <span>
                    <FaXmark />
                  </span>
                  <span>Java</span>
                </div>
                <div className=" inline-flex items-center gap-2 bg-black rounded text-white py-2 px-3">
                  <span>
                    <FaXmark />
                  </span>
                  <span>React Native</span>
                </div>
              </div>
              <form className=" max-w-screen-sm">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <GrLocation className="text-black text-2xl" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full  py-3 px-4 ps-12 text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900"
                    placeholder="Address..."
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Salary */}
        <div className="flex items-start  py-6 border-b gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">Salary*</h6>
            <p className="text-base text-[#838383]">
              Select your salary range which you prefer for the job.
            </p>
          </div>
          <div className="w-full gap-5 shrink-0 ">
            <div className=" flex flex-col gap-4">
              <form className=" flex gap-3 items-center">
                <div>
                  <input
                    type="search"
                    id="default-search"
                    className="block   py-3.5 px-4  text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900  max-w-60 w-full text-center"
                    placeholder="Salary Amount"
                    required
                  />
                </div>
                <div className="relative max-w-60 w-full">
                  <select
                    id="salaryType"
                    defaultValue=""
                    className="bg-[#F2F2F2] border border-[#EBEBEB] text-gray-900 text-lg rounded-lg focus:ring-transparent focus:border-transparent block w-full py-3 px-4 appearance-none"
                  >
                    <option value="" disabled>
                      Select salary type
                    </option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                    <option value="negotiable">Negotiable</option>
                    <option value="commission">Commission-based</option>
                  </select>
                  <MdOutlineKeyboardArrowDown
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                    size={24}
                  />
                </div>
                <div className="relative max-w-60 w-full">
                  <select
                    id="currency"
                    defaultValue=""
                    className="bg-[#F2F2F2] border border-[#EBEBEB] text-gray-900 text-lg rounded-lg focus:ring-transparent focus:border-transparent block w-full py-3 px-4 appearance-none"
                  >
                    <option value="" disabled>
                      Select currency
                    </option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                    <option value="INR">INR</option>
                    <option value="CNY">CNY</option>
                    <option value="SGD">SGD</option>
                    <option value="ZAR">ZAR</option>
                  </select>
                  <MdOutlineKeyboardArrowDown
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                    size={24}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Deadline */}
        <div className="flex items-start  py-6 border-b gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">Deadline*</h6>
            <p className="text-base text-[#838383]">
              Here you create a deadline for who are want to drop the CV.
            </p>
          </div>
          <div className="w-full gap-5 shrink-0 ">
            <form className="max-w-60 w-full">
              <div className="">
                <input
                  type="date"
                  id="date-picker"
                  className="block w-full py-3 px-4  text-base border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-black focus:ring-1 focus:outline-none text-slate-900"
                  placeholder="Select a date..."
                  required
                />
              </div>
            </form>
          </div>
        </div>
        {/* Deadline */}
        <div className="flex flex-col items-start  py-6  gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">
              Description*
            </h6>
            <p className="text-base text-[#838383]">
              Please write to details for your job post and condition.
            </p>
          </div>
          <div className="w-full gap-5 shrink-0 ">
            <form className=" w-full">
              <div className=""></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPost;
