import ConnectionsView from "@/components/connections/ConnectionsView";

import { cookies } from "next/headers";

const ConnectionsMap = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div className="bg-red-600">
      <ConnectionsView token={token ? token : ""} />
    </div>
  );
};

export default ConnectionsMap;
