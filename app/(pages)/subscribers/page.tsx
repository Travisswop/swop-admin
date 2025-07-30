import SubscribetionTable from "@/components/subscribe/SubscribetionTable";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <section className="">
      <SubscribetionTable token={token ? token : ""} />
    </section>
  );
};

export default page;
