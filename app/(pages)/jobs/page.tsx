import { getJobs } from "@/action/jobs";
import JobsPost from "@/components/jobs/JobsPost";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  const jobDetails = await getJobs(token ? token : "");

  return (
    <section className="w-full h-full text-black">
      <JobsPost jobDetails={jobDetails?.data} />
    </section>
  );
};

export default page;
