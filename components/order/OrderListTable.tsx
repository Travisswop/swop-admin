"use client";
import { getOrderLists } from "@/action/ordersList";
import { Order } from "@/types/orders";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { idShorter } from "../util/idShorter";
import ExportButton from "./ExportButton";

interface IPagination {
  totalPages: number;
  currentPage: number;
  previousPage: number;
}

const OrderListTable = ({ token }: { token: string }) => {
  const [ordersList, setOrderList] = useState<Order[]>([]);
  console.log("ordersList", ordersList);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    startDate: "",
    endDate: "",
    sort: "createdAt:desc",
  });

  const [pagination, setPagination] = useState<IPagination>();

  // Fetch Orders Data
  useEffect(() => {
    const fetchOrders = async () => {
      const { page, limit, search, startDate, endDate, sort } = queryParams;
      try {
        const response = await getOrderLists(
          token as string,
          page,
          limit,
          search,
          startDate,
          endDate,
          sort
        );

        setOrderList(response?.data);
        setPagination(response?.pagination);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [queryParams, token]);

  // --- HANDLERS ---
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setQueryParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1, // Reset to first page on search
    }));
  };

  // const handleDateChange = (startDate, endDate) => {
  //   setQueryParams((prev) => ({
  //     ...prev,
  //     startDate,
  //     endDate,
  //     page: 1,
  //   }));
  // };

  const handleSortChange = (column: string) => {
    setQueryParams((prev) => {
      // Determine if we need to toggle the sort direction for the given column
      const newSortDirection = prev.sort === `${column}:asc` ? "desc" : "asc";

      // Set new query parameters, always reset to page 1 for a fresh sort
      return {
        ...prev,
        sort: `${column}:${newSortDirection}`, // Update sort with new direction
        page: 1, // Reset to first page
      };
    });
  };



  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl p-9">
      {/* --- Top Controls --- */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <div className="flex items-center gap-6">
          <div className="w-96 relative">
            <input
              type="text"
              value={queryParams.search}
              onChange={handleSearchChange}
              className="px-3 py-2 bg-[#F1F8FF] rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
              placeholder="Search by name or email..."
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          </div>
        </div>

        {/* Filters & Export */}
        <div className="flex items-center space-x-5">
          <p className="text-gray-800 font-medium capitalize">Filter</p>
          {/* <DateFilterDropdown handleSortChange={handleSortChange} /> */}

          {/* <NameFilterDropdown handleSortChange={handleSortChange} /> */}

          <ExportButton ordersList={ordersList} />
        </div>
      </div>

      {/* --- Orders Table --- */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-500 border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium border-b">
            <tr>
              {[
                { label: "ID", key: "id" },
                { label: "Name", key: "customer.name" },
                { label: "Email", key: "customer.email" },
                { label: "Amount", key: "financial.totalCost" },
                { label: "Transaction Hash", key: "txResult.hash" },
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-base font-normal text-center cursor-pointer"
                  onClick={() => handleSortChange(header.key)}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersList?.length > 0 ? (
              ordersList?.map((el, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b text-gray-800 text-sm"
                >
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>{el?._id}</Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>{el?.customer?.name}</Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>
                      {el?.customer?.email}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>
                      {el?.financial?.totalCost.toFixed(2)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 break-all text-center">
                    <Link href={`/order/${el?._id}`}>
                      {idShorter(el?.txResult?.hash)}{" "}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      <div className="flex justify-center items-center mt-6 space-x-7">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(queryParams.page - 1)}
          disabled={queryParams.page <= 1} // Disabled if page is 1 or less
          className={`px-4 py-2 rounded-lg w-28 ${
            queryParams.page <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200"
          }`}
        >
          Previous
        </button>

        {/* Current Page Display */}
        <span>Page {queryParams.page}</span>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(queryParams.page + 1)}
          className={`px-4 py-2 rounded-lg w-28 ${
            pagination?.totalPages === queryParams.page
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200"
          }`}
          disabled={pagination?.totalPages === queryParams.page} // Disabled if it's the last page
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderListTable;
