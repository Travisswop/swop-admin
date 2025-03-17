import { getOrderDetailsById } from "@/action/ordersList";
import OrderDetails from "@/components/order/OrderDetails";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const token = (await cookies()).get("authToken")?.value;

  const { id } = resolvedParams;

  const orderDetails = await getOrderDetailsById(token || "", id);

  return (
    <div>
      <OrderDetails orderDetails={orderDetails?.data} />
    </div>
  );
};

export default Page;
