import { getJobsById } from "@/action/jobs";
import EditJobPost from "@/components/jobs/EditJobPost";

import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const token = (await cookies()).get("authToken")?.value;

  const jobDetails = await getJobsById(id, token || "");

  return <EditJobPost jobDetails={jobDetails?.data} id={id} token={token} />;
};

export default page;
