import { Financial, StripePayment } from "@/types/dispute";
import { FaCcStripe } from "react-icons/fa";

const DisputPaymentInfo = ({
  paymentInfo,
  financial,
}: {
  paymentInfo: StripePayment;
  financial: Financial;
}) => {
  const getStatusColor = () => {
    switch (paymentInfo?.status) {
      case "succeeded":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="p-6 border rounded shadow">
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Payment Summary
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Payment Status</span>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}
          >
            {paymentInfo?.status}
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Payment Method</span>
          <span className="flex items-center gap-1 text-blue-600">
            <FaCcStripe className="size-9" />
          </span>
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-700">${financial?.subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Shipping</span>
          <span className="text-gray-700">${financial?.shippingCost}</span>
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="flex justify-between font-semibold text-green-600 text-lg">
          <span>Total Paid</span>
          <span>${financial?.totalCost}</span>
        </div>
      </div>
    </div>
  );
};

export default DisputPaymentInfo;
