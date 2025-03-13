import IndividualUser from "@/components/swopId/IndividualUser";
import React from "react";

const DetailsSwopIdPage = async ({
  params,
}: {
  params: Promise<{ individualId: string }>;
}) => {
  const { individualId } = await params;
  return <IndividualUser individualId={individualId} />;
};

export default DetailsSwopIdPage;
