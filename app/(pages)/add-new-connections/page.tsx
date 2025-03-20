import AddNewConnectionsForm from "@/components/connections/AddNewConnectionsForm";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div>
      <AddNewConnectionsForm token={token ? token : ""} />
    </div>
  );
};

export default page;
