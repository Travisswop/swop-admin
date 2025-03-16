import { getUserLists } from "@/action/swopId";
import UserLists from "@/components/swopId/UserLists";
// import { SearchParams } from "@/types/user";
import { cookies } from "next/headers";

const SwopId = async () => {
  const token = (await cookies()).get("authToken")?.value;
  const page = 1;
  const limit = 10;
  const userLists = await getUserLists(token || "", page, limit);

  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      <UserLists userLists={userLists} />
    </section>
  );
};

export default SwopId;
