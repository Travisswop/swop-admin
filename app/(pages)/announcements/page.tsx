import { getAnnouncements } from "@/action/announcements";
import AnnouncementsDetials from "@/components/announcements/AnnouncementsDetials";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  const announcementsDetials = await getAnnouncements(token ? token : "");

  return (
    <div>
      <AnnouncementsDetials
        announcementsDetials={announcementsDetials?.data}
        token={token ? token : ""}
      />
    </div>
  );
};

export default page;
