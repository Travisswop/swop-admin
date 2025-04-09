import { getDefaultConnection } from "@/action/connections";
import ConnectionsView from "@/components/connections/ConnectionsView";

import { cookies } from "next/headers";

const ConnectionsMap = async () => {
  const token = (await cookies()).get("authToken")?.value;
  const { data: connections } = await getDefaultConnection(token ? token : "");

  return (
    <div className="">
      <ConnectionsView connections={connections} token={token ? token : ""} />
    </div>
  );
};

export default ConnectionsMap;
