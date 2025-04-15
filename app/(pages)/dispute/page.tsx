import DisputeListTable from "@/components/dispute/DisputeListTable";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div>
      <DisputeListTable token={token ? token : ""} />
    </div>
  );
};

export default page;
