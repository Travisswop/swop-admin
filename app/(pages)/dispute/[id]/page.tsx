import { getDisputesDetailsById } from "@/action/dispute";
import DisputeDetials from "@/components/dispute/DisputeDetials";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id: disputeId } = await params;
  const token = (await cookies()).get("authToken")?.value;

  const disputDetails = await getDisputesDetailsById(token || "", disputeId);

  return (
    <div>
      <DisputeDetials disputDetails={disputDetails?.data} />
    </div>
  );
};

export default page;
