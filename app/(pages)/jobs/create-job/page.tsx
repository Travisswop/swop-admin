import AddJobPost from "@/components/jobs/AddJobPost";
import { cookies } from "next/headers";

const Page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return <AddJobPost token={token ? token : ""} />;
};

export default Page;
