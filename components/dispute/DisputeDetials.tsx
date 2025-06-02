"use client";

import { DisputeDetailsResponse } from "@/types/dispute";
import Image from "next/image";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";
import DisputPaymentInfo from "./DisputPaymentInfo";

const resolutionHistory = [
  {
    avatarUrl:
      "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg",
    name: "Ralph Edwards",
    label: "Amount Refunded",
    message:
      "You notice a transaction on your account that you did not authorize or recognize.",
  },
  {
    avatarUrl:
      "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg",
    name: "Ralph Edwards",
    date: "October, 23, 2025",
    message:
      "You notice a transaction on your account that you did not authorize or recognize.",
  },
  {
    avatarUrl:
      "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg",
    name: "Ralph Edwards",
    date: "October, 23, 2025",
    message:
      "You notice a transaction on your account that you did not authorize or recognize.",
  },
  {
    avatarUrl:
      "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg",
    name: "Ralph Edwards",
    message:
      "You notice a transaction on your account that you did not authorize or recognize.",
  },
];

const DisputeDetials = ({
  disputDetails,
}: {
  disputDetails: DisputeDetailsResponse;
}) => {
  console.log("check details page data ", disputDetails);

  return (
    <div className=" bg-white p-9">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dispute Details */}
        <div className="">
          <div className="">
            <h2 className="text-lg font-semibold mb-4">Dispute Details</h2>

            <div className="bg-white border p-6 rounded shadow">
              <div className="mb-4">
                <p className="text-sm text-gray-800">Services/Item Details</p>
                <p className="font-medium capitalize">
                  {disputDetails?.dispute?.category}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Order ID</p>
                <p className="font-medium text-blue-600 underline cursor-pointer">
                  {disputDetails?.order?.orderId}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Buyer</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.buyer?.name}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Address</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.buyer?.address?.line1}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Dispute Reason</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.dispute?.reason}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Type of Dispute</p>
                <p className="font-medium capitalize text-gray-800">
                  {disputDetails?.dispute?.category}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-800">Request Details</p>
                <p className="text-sm text-gray-800 mt-1">
                  {disputDetails?.dispute?.description}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                {disputDetails?.dispute?.documents?.map((el, index) => (
                  <div
                    key={index}
                    className="text-sm px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 flex items-center space-x-2 cursor-pointer"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = el.downloadUrl;
                      link.download =
                        el?.fileName || `file_${index}.${el.fileType || "pdf"}`; // Forces download with a filename
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    {el.fileType === "jpeg" ? (
                      <>
                        <IoImageOutline className="size-5 text-gray-600" />
                        <span>{el?.fileName || "JPEG Image"}</span>
                      </>
                    ) : (
                      <>
                        <IoDocumentTextOutline className="size-5 text-gray-600" />
                        <span>{el?.fileName || "Document"}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Dispute Details Section */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>

            <div className="bg-white border rounded shadow">
              {/* Order Items Table */}
              <div className="mb-4 overflow-x-auto max-w-6xl">
                <table className="w-full text-left border border-red-800 rounded-lg overflow-hidden">
                  <thead className="text-base font-medium text-gray-700 bg-gray-50">
                    <tr>
                      {["Product Name", "Quantity", "Price"].map(
                        (header, idx) => (
                          <th key={idx} className="px-6 py-3 border-gray-200">
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {disputDetails?.order?.mintedNfts &&
                    disputDetails?.order?.mintedNfts.length > 0 ? (
                      disputDetails?.order?.mintedNfts?.map(
                        (product, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-50 border-b border-gray-400 text-base text-gray-800  hover:bg-gray-100 transition-colors"
                          >
                            <td className="py-4 capitalize pl-5">
                              {product?.template?.name}
                            </td>
                            <td className="py-4 pl-10">{product?.quantity}</td>
                            <td className="py-4 pl-6">
                              <div className="font-medium">
                                $ {product?.template?.price}
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-gray-500"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {disputDetails?.order?.paymentMethod === "stripe" ? (
            <div className="mt-5">
              <h2 className="text-lg font-semibold mb-4">
                Payment Information
              </h2>

              <DisputPaymentInfo
                paymentInfo={disputDetails?.stripePayment}
                financial={disputDetails?.order?.financial}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Resolution */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Resolution</h2>

          <div className="bg-white p-6 border rounded shadow">
            <div className="flex justify-between flex-wrap space-x-6">
              <div className="flex-1">
                <p className="text-sm text-gray-800">Disputes</p>
                <p className="font-medium text-gray-800">WGYkjdsh-231</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Expired on</p>
                <p className="font-medium text-gray-800">October, 23, 2025</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Resolution Status</p>
                <span className="inline-block px-3 py-1 text-sm  border border-green-700 rounded mt-1 capitalize">
                  {disputDetails?.dispute?.status}
                </span>
              </div>
            </div>

            <div className="flex justify-between flex-wrap space-x-6 mt-16">
              <div className="mb-4 flex-1">
                <p className="text-sm text-gray-800">Resolution Reached</p>
                <p className="font-medium text-gray-800">Awarded to Customer</p>
              </div>
              <div className="mb-6 flex-1">
                <p className="text-sm text-gray-800">Amount Refunded</p>
                <p className="font-medium text-green-600">$ 0</p>
              </div>
              <div className="mb-6 flex-1"></div>
            </div>

            <div className="border-b text-gray-800 w-full my-4 " />

            <div className="mb-6 flex justify-between items-center">
              <div className="">
                <h3 className="text-md font-medium text-gray-800">
                  Resolution History
                </h3>
                <p className="text-sm text-gray-800">
                  Please see below for dispute
                </p>
              </div>
              <button className="text-sm px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">
                Archive
              </button>
            </div>

            <div className="space-y-4">
              {resolutionHistory?.map((el, index) => (
                <div className="flex items-start gap-3 mb-6 " key={index}>
                  <Image
                    src={el?.avatarUrl}
                    alt={el?.name}
                    className="w-10 h-10 rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-gray-800">{el?.name}</p>
                    <div className="border rounded-lg px-4 py-3 bg-white shadow-sm">
                      {el?.label && (
                        <p className="text-sm text-gray-400 font-medium mb-1">
                          {el?.label}
                        </p>
                      )}
                      {el?.date && (
                        <p className="text-sm text-gray-400 font-medium mb-1">
                          {el?.date}
                        </p>
                      )}
                      <p className="text-sm text-gray-800">{el?.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetials;
