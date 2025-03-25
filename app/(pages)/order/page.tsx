import OrderListTable from "@/components/order/OrderListTable";
import { cookies } from "next/headers";

const OrderPage = async () => {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div>
      <OrderListTable token={token ? token : ""} />
    </div>
  );
};

export default OrderPage;
