"use client";

import Image from "next/image";
import { IoDocumentTextOutline, IoImageOutline } from "react-icons/io5";

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

const DisputeDetials = () => {
  return (
    <div className=" bg-white p-9">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dispute Details */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Dispute Details</h2>

          <div className="bg-white border p-6 rounded shadow">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Services/Item Details</p>
              <p className="font-medium">Handcrafted Solid Wood</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium text-blue-600 underline cursor-pointer">
                Order Tracking Info
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Buyer</p>
              <p className="font-medium">Sadit Ahsa</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Dispute Reason</p>
              <p className="font-medium">Item not as described</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Type of Dispute</p>
              <p className="font-medium">Chargeback</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Request Details</p>
              <p className="text-sm text-gray-700 mt-1">
                You notice a transaction on your account that you did not
                authorize or recognize. This could be a case of fraudulent
                activity, such as a purchase made without your consent or a
                subscription you didn’t sign up for...
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="text-sm px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 flex items-center space-x-2">
                <IoDocumentTextOutline className="size-5 text-gray-600" />
                <span>document.doc</span>
              </button>
              <button className="text-sm px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 flex items-center space-x-2">
                <IoImageOutline className="size-5 text-gray-600" />
                <span> image.png </span>
              </button>
            </div>
          </div>
        </div>

        {/* Resolution */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Resolution</h2>

          <div className="bg-white p-6 border rounded shadow">
            <div className="flex justify-between flex-wrap space-x-6">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Disputes</p>
                <p className="font-medium">WGYkjdsh-231</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Expired on</p>
                <p className="font-medium">October, 23, 2025</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Resolution Status</p>
                <span className="inline-block px-3 py-1 text-sm  border border-green-700 rounded mt-1">
                  Resolved
                </span>
              </div>
            </div>
            <div className="flex justify-between flex-wrap space-x-6 mt-16">
              <div className="mb-4 flex-1">
                <p className="text-sm text-gray-500">Resolution Reached</p>
                <p className="font-medium">Awarded to Customer</p>
              </div>
              <div className="mb-6 flex-1">
                <p className="text-sm text-gray-500">Amount Refunded</p>
                <p className="font-medium text-green-600">$ 125.216</p>
              </div>
              <div className="mb-6 flex-1"></div>
            </div>

            <div className="border-b bg-gray-500 w-full my-4" />

            <div className="mb-6 flex justify-between items-center">
              <div className="">
                <h3 className="text-md font-medium">Resolution History</h3>
                <p className="text-sm text-gray-500">
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
