"use client";

import { Order } from "@/types/orders";
import { LuDownload } from "react-icons/lu";

// interface Order {
//   id: string;
//   customer: {
//     name: string;
//     email: string;
//   };
//   financial: {
//     totalCost: number;
//   };
//   txResult: {
//     hash: string;
//   };
// }

const ExportButton = ({ ordersList }: { ordersList: Order[] }) => {
  // Function to convert data to CSV format
  const convertToCSV = (data: Order[]) => {
    const header = [
      "Order ID",
      "Customer Name",
      "Customer Email",
      "Total Cost",
      "Transaction Hash",
    ];
    const rows = data.map((el) => [
      el?._id,
      el?.buyer?.name,
      el?.buyer?.email,
      el?.financial?.totalCost,
      el?.txResult?.hash,
    ]);

    // Add the header to the rows
    const allRows = [header, ...rows];

    // Convert to CSV format
    return allRows.map((row) => row.join(",")).join("\n");
  };

  // Function to handle the CSV download
  const downloadCSV = () => {
    const csv = convertToCSV(ordersList);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "orders.csv");
    link.click();
  };

  return (
    <div>
      <button
        onClick={downloadCSV}
        className="flex items-center gap-2 bg-black px-3 py-2 transition-all border-2 border-gray-200 rounded-lg w-36 justify-center"
      >
        <p className="text-white font-medium capitalize">Export</p>
        <LuDownload className="size-5 text-white" />
      </button>
    </div>
  );
};

export default ExportButton;
