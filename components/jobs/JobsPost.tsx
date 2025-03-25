import { Jobs } from "@/types/jobs";
import Link from "next/link";
import { formatDate } from "../util/formatData";

const JobsPost = ({ jobDetails }: { jobDetails: Jobs[] }) => {
  
  return (
    <div className="p-9 bg-white min-h-fit h-full rounded-2xl">
      <div>
        {jobDetails?.map((el, index) => (
          <div
            className="flex items-end justify-between p-6 border rounded "
            key={index}
          >
            <div className="w-full">
              <div className=" flex items-center gap-3 ">
                <h4 className="text-2xl font-semibold text-[#2D3032]">
                  {el?.jobTitle}
                </h4>
                <p className="text-sm font-medium capitalize">({el?.status})</p>
              </div>
              <p className="text-base text-[#737791] font-normal mt-2 mb-1">
                Deadline: {formatDate(el?.createdAt)}
              </p>
              <div className="flex gap-3 items-center font-medium ">
                <p className="text-lg capitalize">{el?.jobType}</p>
                <p className="text-lg">
                  Salary: {el?.minSalary} - {el?.maxSalary}
                </p>
              </div>
            </div>
            <div className="flex gap-5 shrink-0 ">
              <Link
                href="/jobs/view-cv/user-id"
                className=" text-base font-medium py-2 flex justify-center items-center w-32   text-center border border-black rounded relative"
              >
                View CV
                <span className=" w-7 h-7 bg-[#FF6060] text-white text-sm font-medium rounded-full flex items-center justify-center absolute -top-2.5 -right-2.5">
                  15
                </span>
              </Link>
              <Link
                href={`/jobs/${el?._id}`}
                className=" text-base font-medium py-2 flex justify-center items-center w-44  text-center border border-black rounded bg-black text-white"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className=" text-center mt-10">
        <Link
          href="/jobs/create-job"
          className="text-base font-medium py-2.5 inline-flex justify-center items-center px-8 max-w-64 w-full  text-center border border-black rounded bg-black text-white"
        >
          Add Job Post
        </Link>
      </div>
    </div>
  );
};

export default JobsPost;
