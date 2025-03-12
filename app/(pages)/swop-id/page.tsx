import { getUserLists } from "@/action/swopId";
import UserLists from "@/components/swopId/UserLists";
// import { SearchParams } from "@/types/user";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SwopId = async ({ searchParams }: PageProps) => {
  const token = (await cookies()).get("authToken")?.value;
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 10;
  const userLists = await getUserLists(token || "", page, limit);
  console.log("user lists", userLists);

  return (
    <section className="w-full h-full flex flex-col justify-start items-center text-[#737791]">
      <UserLists userLists={userLists} />
    </section>
  );
};

export default SwopId;
