import AnnouncementsCreate from "@/components/announcements/AnnouncementsCreate";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div>
      <AnnouncementsCreate token={token ? token : ""} />
    </div>
  );
};

export default page;
