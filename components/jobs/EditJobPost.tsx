"use client";

import { updateJob } from "@/action/jobs";
import { Jobs } from "@/types/jobs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import TextEditor from "./TextEditor";

const EditJobPost = ({
  token,
  jobDetails,
  id,
}: {
  token: string;
  jobDetails: Jobs[];
  id: string;
}) => {
  const router = useRouter();
  const [publisLoading, setPublisLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [jobsForm, setJobsForm] = useState<Jobs>({
    jobTitle: jobDetails?.[0]?.jobTitle || "",
    officeLocation: jobDetails?.[0]?.officeLocation || "",
    skills: jobDetails?.[0]?.skills || [],
    jobType: jobDetails?.[0]?.jobType || "",
    minSalary: jobDetails?.[0]?.minSalary || 0,
    maxSalary: jobDetails?.[0]?.maxSalary || 0,
    salaryType: jobDetails?.[0]?.salaryType || "",
    currency: jobDetails?.[0]?.currency || "",
    deadline: jobDetails?.[0]?.deadline || new Date(),
    description: jobDetails?.[0]?.description || "",
    status: jobDetails?.[0]?.status || "",
 
  });

  const [inputValue, setInputValue] = useState("");

  // Add skill when pressing Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!jobsForm.skills.includes(inputValue.trim())) {
        setJobsForm((prev) => ({
          ...prev,
          skills: [...prev.skills, inputValue.trim()],
        }));
      }
      setInputValue("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setJobsForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Handle input change dynamically
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setJobsForm((prev: Jobs) => ({
      ...prev,
      [name]: value, // Update the corresponding key dynamically
    }));
  };

  const handleCheckboxChange = (jobType: string) => {
    setJobsForm((prev) => ({
      ...prev,
      jobType, // Update the jobType with the selected one
    }));
  };

  const handleSubmit = async (
    status: "" | "draft" | "published" | "expired" | undefined
  ) => {
    setJobsForm((prev) => ({
      ...prev,
      status,
    }));

    if (status === "draft") {
      setDraftLoading(true);
    }

    if (status === "published") {
      setPublisLoading(true);
    }

    setError("");

    try {
      const response = await updateJob(jobsForm, id, token);

      if (response.success) {
        toast.success("Job update successfully");
        console.log("Job update successfully");

        setJobsForm({
          jobTitle: "",
          officeLocation: "",
          skills: [],
          jobType: "",
          minSalary: 0,
          maxSalary: 0,
          salaryType: "",
          currency: "",
          deadline: new Date(),
          description: "",
          status: "",
        });

        router.back();
      } else {
        toast.error(response.message || "Failed to update job");
      }
    } catch (err) {
      console.error("Error job post:", err);
      toast.error("Error posting job");
      setError("Failed to post job. Please try again.");
    } finally {
      setPublisLoading(false);
      setDraftLoading(false);
    }
  };

  console.log("error", error);

  return (
    <div className="p-10 bg-white min-h-fit h-full overflow-hidden">
      <div>
        {/* Details */}
        <div className="flex  items-center justify-between pb-6 border-b gap-8">
          <div className="w-full">
            <h6 className="text-xl font-medium mb-2 text-black">Details</h6>
            <p className="text-base text-[#838383]">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="flex gap-5 shrink-0 ">
            <button
              onClick={() => handleSubmit("draft")}
              className=" text-base font-medium py-2 flex justify-center items-center w-44   text-center border border-black rounded text-black "
            >
              {draftLoading ? "Loading..." : "Save as draft"}
            </button>
            <button
              onClick={() => handleSubmit("published")}
              className=" text-base font-medium py-2 flex justify-center items-center w-44  text-center border border-black rounded bg-black text-white"
            >
              {publisLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
        {/* Office Location */}
        <div className="inline-flex w-full items-start  py-6 border-b gap-8  overflow-hidden">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">Job Title* </h6>
            <p className="text-base text-[#838383]">
              Job titles must describe one position.s
            </p>
          </div>
          <div className="w-max gap-5 shrink-0 ">
            <div className=" flex flex-col gap-4">
              <form className="w-[400px] 2xl:[w-700px]">
                <input
                  type="search"
                  id="default-search"
                  className="block py-3 px-4 text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900  w-full mb-2 "
                  placeholder="Job title write here"
                  required
                  name="jobTitle"
                  value={jobsForm.jobTitle}
                  onChange={handleInputChange}
                />
                <label className="text-base text-[#838383] ">
                  26 character
                </label>
              </form>
            </div>
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
          <div className="w-max gap-5 shrink-0 ">
            <ul>
              {[
                "Full Time",
                "Part Time",
                "Contract",
                "Freelance",
                "Internship",
              ].map((type) => (
                <li key={type} className="w-full">
                  <div className="flex items-center ps-3 gap-1">
                    <input
                      id={type.toLowerCase()}
                      type="checkbox"
                      checked={jobsForm.jobType === type} // Only one is checked at a time
                      onChange={() => handleCheckboxChange(type)}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={type.toLowerCase()}
                      className="w-full py-3 ms-2 text-lg font-medium text-black"
                    >
                      {type}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Office Location */}
        <div className="inline-flex w-full items-start  py-6 border-b gap-8  overflow-hidden">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">
              Office Location*
            </h6>
            <p className="text-base text-[#838383]">
              Company address goes to this section.
            </p>
          </div>
          <div className="w-max gap-5 shrink-0 ">
            <div className=" flex flex-col gap-4">
              <form className="w-[400px] 2xl:[w-600px]">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <GrLocation className="text-black text-2xl" />
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    className="block py-3 px-4 ps-12 text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900  w-full"
                    placeholder="Address..."
                    required
                    name="officeLocation"
                    value={jobsForm.officeLocation}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
              {/* 
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
              </form> */}
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
          <div className="w-max gap-5 shrink-0 ">
            <div className="flex flex-col gap-4 w-[400px] 2xl:w-[600px]">
              {/* Skills List */}
              <div className="flex gap-3 items-center flex-wrap">
                {jobsForm.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 bg-black rounded text-white py-2 px-3"
                  >
                    <span>{skill}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <FaXmark />
                    </span>
                  </div>
                ))}
              </div>

              {/* Input Field */}
              <form
                className="max-w-screen-sm"
                onSubmit={(e) => e.preventDefault()} // Prevents accidental form submission
              >
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <IoIosSearch className="text-black text-2xl" />
                  </div>
                  <input
                    type="text"
                    className="block w-full py-3 px-4 ps-12 text-base border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent text-slate-900"
                    placeholder="Press enter to add another skill"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
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
          <div className="w-max gap-5 shrink-0 ">
            <form className=" flex flex-col 2xl:flex-row gap-4 items-center">
              <div className="flex items-center space-x-3">
                <p>Min</p>
                <input
                  type="number"
                  id="default-search"
                  className="block   py-3.5 px-4  text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900  w-32  text-center"
                  placeholder=""
                  required
                  name="minSalary"
                  value={jobsForm.minSalary}
                  onChange={handleInputChange}
                />
                <p>Max</p>
                <input
                  type="number"
                  id="default-search"
                  className="block   py-3.5 px-4  text-base  border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-transparent focus:ring-0  focus:inset-0 text-slate-900 w-32  text-center"
                  placeholder=""
                  required
                  name="maxSalary"
                  value={jobsForm.maxSalary}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative w-60 ">
                <select
                  id="salaryType"
                  defaultValue=""
                  className="bg-[#F2F2F2] border border-[#EBEBEB] text-gray-900 text-lg rounded-lg focus:ring-transparent focus:border-transparent block w-full py-3 px-4 appearance-none"
                  name="salaryType"
                  value={jobsForm.salaryType}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select salary type
                  </option>
                  <option value="hourly">Hourly</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
                <MdOutlineKeyboardArrowDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                  size={24}
                />
              </div>
              <div className="relative w-60 ">
                <select
                  id="currency"
                  defaultValue=""
                  className="bg-[#F2F2F2] border border-[#EBEBEB] text-gray-900 text-lg rounded-lg focus:ring-transparent focus:border-transparent block w-full py-3 px-4 appearance-none"
                  name="currency"
                  value={jobsForm.currency}
                  onChange={handleInputChange}
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
                  <option value="BDT">BDT</option>
                </select>
                <MdOutlineKeyboardArrowDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                  size={24}
                />
              </div>
            </form>
          </div>
        </div>
        {/* Deadline */}
        <div className="flex items-start py-6 border-b gap-8">
          <div className="w-1/3 shrink-0 ">
            <h6 className="text-xl font-medium mb-2 text-black">Deadline*</h6>
            <p className="text-base text-[#838383]">
              Here you create a deadline for who are want to drop the CV.
            </p>
          </div>
          <div className="w-max gap-5 shrink-0 ">
            <form className="w-60">
              <input
                type="date"
                id="date-picker"
                className="block w-full py-3 px-4  text-base border border-[#EBEBEB] rounded-lg bg-[#F2F2F2] focus:ring-transparent focus:border-black focus:ring-1 focus:outline-none text-slate-900"
                placeholder="Select a date..."
                required
                name="deadline"
                value={jobsForm.deadline.toISOString().split("T")[0]}
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col items-start  py-6  gap-6">
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
              <div className="">
                <TextEditor setJobsForm={setJobsForm} jobsForm={jobsForm} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPost;
