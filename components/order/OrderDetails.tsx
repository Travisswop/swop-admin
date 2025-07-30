"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
interface ProcessingStage {
  _id: string;
  stage: string;
  status: string;
  timestamp: string;
}

type StageKey =
  | "order_created"
  | "payment_verified"
  | "nft_minted"
  | "shipping_prepared"
  | "completed";

type StatusKey = "pending" | "in_progress" | "completed" | "failed";
interface OrderDetailsProps {
  orderDetails: {
    dispute: {
      orderId: string;
      id: string;
      reason: string;
      category: string;
      description: string;
      status: "pending" | "resolved" | "rejected" | "in_review"; // enum if possible
      priority: "low" | "medium" | "high";
      createdAt: string;
      updatedAt: string;
      response: string | null;
      responseDate: string | null;
      documents: Document[];
      sellerChallenge: unknown | null;
    } | null;
    collections: {
      image: string;
      name: string;
      description: string;
      NFTType: string;
      price: number;
      ownerAddress: string;
    }[];
    order: {
      processingStages: ProcessingStage[];
      buyer: {
        name: string;
        email: string;
        phone: string;
        address: { line1: string };
        wallet: {
          ens: string;
          address: string;
        };
      };
      seller: {
        name: string;
        email: string;
        phone: string;
        address: { line1: string };
        wallet: {
          ens: string;
          address: string;
        };
      };
      mintedNfts: {
        quantity: number;
        nftTemplateId: {
          image: string;
          name: string;
          description: string;
          nftType: string;
          price: string;
          ownerAddress: string;
        };
      }[];
      stripePaymentMethod: string;
      orderId: string;
      orderDate: string;
      buyerId: string;
      txResult: {
        hash: string;
        status: string;
        tokenAmount: string;
        transferAmount: string;
        tokenName: string;
        tokenSymbol: string;
        tokenAddress: string;
      };
      financial: {
        subtotal: number;
        discountRate: number;
        shippingCost: number;
        totalCost: number;
      };
    };
  };
}

const tabItems = [
  { title: "Order History", slug: "orderHistory" },
  { title: "Customer Details", slug: "customerDetails" },
  { title: "Seller Details", slug: "sellerDetails" },
  { title: "Dispute", slug: "dispute" },
  { title: "Payment Method", slug: "stripePaymentMethod" },
];

const OrderDetails = ({ orderDetails }: OrderDetailsProps) => {
  // const [selected, setSelected] = useState("orderHistory");
  // const [processingStages, setProcessingStages] = useState<ProcessingStage[]>(
  //   []
  // );

  const [selected, setSelected] = useState("orderHistory");

  // Format date function
  // const formatDate = (dateString: string) => {
  //   return dateFormatter.format(new Date(dateString));
  // };

  console.log("Processing Stages:");

  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className="border-l-2 border-gray-300 pl-4">
      <p className="text-sm text-gray-500">{label}:</p>
      <p className="text-md font-semibold text-gray-700">{value}</p>
    </div>
  );

  // Stage display names mapping with explicit typing
  const stageDisplayNames: Record<StageKey, string> = {
    order_created: "Order Created",
    payment_verified: "Payment Verified",
    nft_minted: "NFT Minted",
    shipping_prepared: "Shipping",
    completed: "Order Completed",
  };

  const statusDisplayNames = {
    completed: "Completed",
    in_progress: "In Progress",
    pending: "Pending",
    failed: "Failed",
  };

  const OrderProcessingTimeline = ({
    stages,
  }: {
    stages: ProcessingStage[];
  }) => {
    // Memoize date formatter to prevent unnecessary recreation
    const dateFormatter = useMemo(() => {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }, []);

    // Format date function
    const formatDate = (dateString: string) => {
      return dateFormatter.format(new Date(dateString));
    };

    return (
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-0">
          {stages.map((stage, index) => {
            const isCompleted = stage.status === "completed";
            const isLast = index === stages.length - 1;

            return (
              <div key={stage._id} className="relative">
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className="h-full w-0.5 bg-gray-300 mt-1"
                        style={{ height: "40px" }}
                      />
                    )}
                  </div>

                  <div className="pb-8">
                    <p className="font-medium text-gray-900">
                      {stageDisplayNames[stage.stage as StageKey] ||
                        stage.stage}
                    </p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        {formatDate(stage.timestamp)}
                      </span>
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          stage.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : stage.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : stage.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : stage.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusDisplayNames[stage.status as StatusKey] ||
                          stage.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 xl:p-10 text-black bg-white rounded-2xl">
      <div className="mb-10">
        <h2 className="text-xl font-semibold">Order Information</h2>
        <div className="flex flex-col items-start gap-2 mt-2">
          <h4 className="text-muted-foreground">
            Order {orderDetails?.order?.orderId}
          </h4>
          <p className="text-gray-500">
            Placed on{"  "}
            {new Date(orderDetails?.order?.orderDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="mb-4 overflow-x-auto max-w-6xl border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-left border border-red-800 rounded-lg overflow-hidden">
          <thead className="text-base font-medium text-gray-700 bg-gray-50 border-b-1">
            <tr>
              {["Product Name", "Product Image", "Quantity", "Price"].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-center border-r border-gray-200"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {orderDetails?.order?.mintedNfts &&
            orderDetails?.order?.mintedNfts?.length > 0 ? (
              orderDetails?.order?.mintedNfts?.map((product, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-400 text-base text-gray-800 text-center hover:bg-gray-100 transition-colors"
                >
                  <td className="border-r border-gray-200 py-4 capitalize">
                    {product?.nftTemplateId?.name}
                  </td>
                  <td className="border-r border-gray-200 py-4">
                    <div className="flex items-center justify-center">
                      <Image
                        src={product?.nftTemplateId?.image}
                        alt={`${product?.nftTemplateId?.name}'s profile`}
                        width={80}
                        height={80}
                        className=""
                      />
                    </div>
                  </td>
                  <td className="border-r border-gray-200 py-4">
                    {product?.quantity}
                  </td>
                  <td className="py-4">
                    <div className="font-medium">
                      $ {product?.nftTemplateId?.price}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No products found in this order
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end max-w-6xl">
        <ul className="w-[400px] bg-white rounded p-3 shadow-sm">
          <li className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
            <p className=" text-gray-500 text-sm">Sub Total</p>
            <p className=" text-gray-800 text-sm font-normal">
              ${orderDetails?.order?.financial?.subtotal}
            </p>
          </li>
          <li className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
            <p className=" text-gray-500 text-sm"> Discount</p>
            <p className=" text-green-600 text-sm font-normal">
              ${orderDetails?.order?.financial?.discountRate}
            </p>
          </li>
          <li className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
            <p className=" text-gray-500 text-sm">Shipping</p>
            <p className=" text-gray-800 text-sm font-normal">
              {" "}
              ${orderDetails?.order?.financial?.shippingCost}
            </p>
          </li>
          <li className="flex justify-end items-center gap-16 pt-3 border-t border-gray-200 mt-3">
            <p className=" text-gray-800 text-sm font-medium">Total</p>
            <p className=" text-gray-800 text-sm font-normal">
              {" "}
              ${orderDetails?.order?.financial?.totalCost}
            </p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col flex-wrap gap-4 mt-8 w-full">
        <div className="relative flex gap-10 border-b border-gray-300 w-full max-w-3xl">
          {tabItems
            .filter((tab) => {
              if (
                tab.slug === "stripePaymentMethod" &&
                orderDetails?.order?.stripePaymentMethod !== "stripe"
              ) {
                return false; // Don't show the tab
              }

              if (tab.slug === "dispute" && orderDetails?.dispute === null) {
                return false; // Don't show the tab
              }

              return true; // Show all other tabs
            })
            .map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelected(tab?.slug)}
                className={clsx(
                  "relative py-2 text-base font-medium transition-colors duration-200",
                  selected === tab?.slug ? "text-gray-600" : "text-gray-500"
                )}
              >
                {tab.title}
                {selected === tab?.slug && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gray-600"
                  />
                )}
              </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="mt-4 w-full max-w-2xl min-h-[350px]">
          {selected === "orderHistory" && (
            <OrderProcessingTimeline
              stages={orderDetails?.order?.processingStages}
            />
          )}
          {selected === "customerDetails" && (
            <div className="max-w-2xl bg-white rounded p-4 shadow-sm">
              <div className="space-y-8">
                <DetailItem
                  label="Customer Name"
                  value={orderDetails?.order?.buyer?.name || "Unknown Customer"}
                />
                <DetailItem
                  label="Swop.ID"
                  value={
                    orderDetails?.order?.buyer?.wallet?.ens || "Unknown Ens"
                  }
                />
                <DetailItem
                  label="Customer Email"
                  value={orderDetails?.order?.buyer?.email || "Unknown Email"}
                />
                <DetailItem
                  label="Customer Number"
                  value={orderDetails?.order?.buyer?.phone || "Unknown Number"}
                />

                <DetailItem
                  label="Shipping Address"
                  value={
                    orderDetails?.order?.buyer?.address?.line1 ||
                    "Unknown Address"
                  }
                />
              </div>
            </div>
          )}
          {selected === "sellerDetails" && (
            <div className="max-w-2xl bg-white rounded p-4 shadow-sm">
              <div className="space-y-8">
                <DetailItem
                  label="Seller Name"
                  value={
                    orderDetails?.order?.seller?.name || "Unknown Customer"
                  }
                />
                <DetailItem
                  label="Swop.ID"
                  value={
                    orderDetails?.order?.seller?.wallet?.ens || "Unknown Ens"
                  }
                />
                <DetailItem
                  label="Seller Email"
                  value={orderDetails?.order?.seller?.email || "Unknown Email"}
                />
                <DetailItem
                  label="Seller Number"
                  value={orderDetails?.order?.seller?.phone || "Unknown Number"}
                />

                <DetailItem
                  label="Shipping Address"
                  value={
                    orderDetails?.order?.seller?.address?.line1 ||
                    "Unknown Address"
                  }
                />
              </div>
            </div>
          )}
          {selected === "dispute" && (
            <div className="max-w-4xl mx-auto p-6 bg-white space-y-6">
              {/* Top Row */}
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-black font-medium">
                    {orderDetails?.dispute?.orderId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Expired on</p>
                  <p className="text-black font-medium">October 30, 2025</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Resolution Status</p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border  text-sm font-medium ${
                      orderDetails?.dispute?.status === "pending"
                        ? "border-yellow-400 text-yellow-400"
                        : "border-green-600 text-green-600"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 text-green-500 ${
                        orderDetails?.dispute?.status === "pending"
                          ? " text-yellow-400"
                          : " text-green-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {orderDetails?.dispute?.status}
                  </div>
                </div>
              </div>

              {/* Amount Refunded */}
              <div>
                <p className="text-sm text-gray-500">Amount Refunded</p>
                <p className="text-lg font-semibold text-black">$0</p>
              </div>

              {/* Dispute Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Dispute Reason</p>
                  <p className="text-black font-medium">
                    {orderDetails?.dispute?.reason}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Type of Dispute</p>
                  <p className="text-black font-medium capitalize">
                    {orderDetails?.dispute?.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Request detail</p>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {orderDetails?.dispute?.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {selected === "stripePaymentMethod" && (
            <div className="max-w-2xl bg-white rounded p-4 shadow-sm">
              <div className="space-y-8">
                <DetailItem
                  label="Status"
                  value={
                    orderDetails?.order?.txResult?.status || "Unknown Status"
                  }
                />
                <DetailItem
                  label="Token Amount"
                  value={
                    orderDetails?.order?.txResult?.tokenAmount ||
                    "Unknown Token Amount"
                  }
                />
                <DetailItem
                  label="Transfer Amount
"
                  value={
                    orderDetails?.order?.txResult?.transferAmount ||
                    "Unknown Transfer Amount"
                  }
                />
                <DetailItem
                  label="Token Name"
                  value={
                    orderDetails?.order?.txResult?.tokenName ||
                    "Unknown Token Name"
                  }
                />

                <DetailItem
                  label="Token Symbol
"
                  value={
                    orderDetails?.order?.txResult?.tokenSymbol ||
                    "Unknown Token Symbol"
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
