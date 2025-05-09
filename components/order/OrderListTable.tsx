"use client";
import { getOrderLists } from "@/action/ordersList";
import { Order } from "@/types/orders";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import Loader from "../ui/Loader";
import { formatDate } from "../util/formatData";
import ExportButton from "./ExportButton";

interface Pagination {
  totalPages: number | null;
  previousPage: number | null;
  currentPage: number | null;
  nextPage: number | null;
}

const OrderListTable = ({ token }: { token: string }) => {
  const [ordersList, setOrderList] = useState<Order[]>([]);
  const [sort, setSort] = useState("orderDate:desc");

  const [orderDataLoading, setOrderDataLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  // Fetch Orders Data

  useEffect(() => {
    let isMounted = true;
    setOrderDataLoading(true);

    const fetchData = async () => {
      try {
        const result = await getOrderLists(
          token,
          currentPage,
          limit,
          searchTerm,
          sort
        );

        if (isMounted) {
          if (result.success) {
            setOrderList(result?.data);
            setTotalPages(result.pagination.totalPages);
            setPagination(result?.pagination);
            setPage(1);
          } else {
            console.error(result.message);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (isMounted) {
          setOrderDataLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, page, limit, token, currentPage, sort]);

  const handleSortChange = (column: string) => {
    setSort((prevSort) => {
      const [field, direction] = prevSort.split(":");
      const newDirection =
        field === column && direction === "asc" ? "desc" : "asc";
      return `${column}:${newDirection}`;
    });
  };

  const handlePaginationClick = React.useCallback(
    (page: number) => {
      if (page > 0 && page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage]
  );

  const renderPagination = useMemo(() => {
    const generatePageNumbers = () => {
      const pageNumbers: number[] = [];

      const safeCurrentPage = currentPage ?? 1;
      const safeTotalPages = pagination?.totalPages ?? 1;

      const startPage = Math.max(1, safeCurrentPage - 1);
      const endPage = Math.min(safeTotalPages, safeCurrentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
      pageNumbers.length > 0 && (
        <nav aria-label="Page navigation" className="flex justify-end mt-8">
          <ul className="inline-flex -space-x-px text-base items-center">
            {/* Previous button */}
            <li>
              <button
                onClick={() => handlePaginationClick((currentPage ?? 1) - 1)}
                disabled={pagination?.previousPage === null || currentPage <= 1}
                className="bg-white border rounded-l-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center"
              >
                <span>Previous</span>
              </button>
            </li>

            {/* Ellipsis before page numbers */}
            {pagination?.previousPage && pagination.previousPage > 1 && (
              <li className="h-[42px] w-[45px] border text-gray-600 flex items-center justify-center hover:bg-gray-100">
                <BsThreeDots />
              </li>
            )}

            {/* Page number buttons */}
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePaginationClick(page)}
                  className={`px-4 py-2 border h-[42px] w-[45px] ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* Ellipsis after page numbers */}
            {pagination?.currentPage &&
              pagination.currentPage + 1 < (pagination.totalPages ?? 0) && (
                <li className="h-[42px] w-[45px] border text-gray-600 flex items-center justify-center hover:bg-gray-100">
                  <BsThreeDots />
                </li>
              )}

            {/* Next button */}
            <li>
              <button
                onClick={() => handlePaginationClick((currentPage ?? 1) + 1)}
                disabled={
                  pagination?.nextPage === null ||
                  currentPage >= (pagination?.totalPages ?? 1)
                }
                className="px-4 py-2 bg-white border rounded-r-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center"
              >
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      )
    );
  }, [pagination, currentPage, handlePaginationClick]);

  console.log("check data", totalPages, ordersList);

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl p-9">
      {/* --- Top Controls --- */}

      <div className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <div className="flex items-center gap-6">
          <div className="w-60 2xl:w-72 relative">
            <input
              type="text"
              className="px-3 py-2 border border-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          </div>
        </div>

        {/* Filters & Export */}
        <div className="flex items-center space-x-5">
          <p className="text-gray-800 font-medium capitalize">Filter</p>
          <th
            onClick={() => handleSortChange("orderDate")}
            className="cursor-pointer select-none px-2 py-2 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-center gap-1 w-32 transition"
          >
            Sort
            {sort.startsWith("orderDate") && (
              <span className="text-xs">
                {sort === "orderDate:asc" ? (
                  <FaArrowUpLong className="text-gray-600 rotate-0 size-4" />
                ) : (
                  <FaArrowUpLong className="text-gray-600 rotate-180 size-4" />
                )}
              </span>
            )}
          </th>

          <ExportButton ordersList={ordersList} />
        </div>
      </div>

      {/* --- Orders Table --- */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-500 border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium border-b">
            <tr>
              {[
                { label: "Order No", key: "orderno" },
                { label: "Date", key: "date" },
                { label: "Customer", key: "customer.name" },
                { label: "Type", key: "customer.type" },
                { label: "Payment", key: "customer.payment" },
                { label: "Price", key: "customer.price" },
                { label: "Payment Status", key: "customer.paymentStatus" },
                { label: "Delivery Status", key: "customer.deliveryStatus" },
                { label: "Order Status", key: "customer.orderStatus" },
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
            {orderDataLoading ? (
              <tr>
                <td colSpan={9} className="text-center w-full h-[400px]">
                  <div className="flex items-center justify-center w-full h-full space-x-2 text-gray-900">
                    <Loader size={"size-7"} color={"fill-primary"} />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : ordersList?.length > 0 ? (
              ordersList?.map((el, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 border-b text-gray-800 text-sm"
                >
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>{el?.orderId}</Link>
                  </td>
                  <td className="px-6 py-4 break-all text-center">
                    <Link href={`/order/${el?._id}`}>
                      {formatDate(new Date(el?.orderDate))}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>{el?.buyer?.name}</Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/order/${el?._id}`}
                      className="border rounded-full p-2 text-xs"
                    >
                      {el?.orderType}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>{el?.paymentMethod}</Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/order/${el?._id}`}>
                      ${el?.financial?.totalCost.toFixed(2)}
                    </Link>
                  </td>
                  <td className={`px-6 py-4 break-all text-center`}>
                    <Link
                      href={`/order/${el?._id}`}
                      className={`rounded-full px-2 py-1 capitalize ${
                        el?.status?.payment === "completed"
                          ? "text-green-400 bg-green-50"
                          : "text-yellow-400 bg-yellow-50"
                      }`}
                    >
                      {el?.status?.payment}
                    </Link>
                  </td>
                  <td className="px-6 py-4 break-all text-center">
                    <Link
                      href={`/order/${el?._id}`}
                      className={`rounded-full px-2 py-1 capitalize ${
                        el?.orderType !== "non-phygitals"
                          ? el?.status?.delivery === "Completed"
                            ? "text-green-400 bg-green-50"
                            : el?.status?.delivery === "Not Initiated"
                            ? "text-yellow-400 bg-yellow-50"
                            : "text-red-400 bg-red-50"
                          : ""
                      }`}
                    >
                      {el?.orderType === "non-phygitals"
                        ? "N/A"
                        : el?.status?.delivery}
                    </Link>
                  </td>
                  <td className="px-6 py-4 break-all text-center">
                    <Link
                      href={`/order/${el?._id}`}
                      className={`rounded-full px-2 py-1 capitalize ${
                        el?.orderType === "non-phygitals"
                          ? el?.status?.payment === "completed"
                            ? "text-green-400 bg-green-50"
                            : "text-white bg-black"
                          : el?.status?.delivery === "Completed" &&
                            el?.status?.payment === "completed"
                          ? "text-green-400 bg-green-50"
                          : "text-white bg-black"
                      }`}
                    >
                      {/* {el?.orderType === "non-phygitals"
                        ? el?.status?.payment !== "completed"
                          ? "Complete"
                          : "Active"
                        : !el?.status?.isDead
                        ? el?.status?.delivery === "Completed" &&
                          el?.status?.payment === "completed"
                          ? "Complete"
                          : "Active"
                        : el?.status?.payment !== "completed"
                        ? "Complete"
                        : "Active"} */}
                      {el?.orderType === "non-phygitals"
                        ? el?.status?.payment === "completed"
                          ? "Completed"
                          : "Active"
                        : el?.status?.delivery === "Completed" &&
                          el?.status?.payment === "completed"
                        ? "Complete"
                        : "Active"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center w-full h-[400px]">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {ordersList?.length > 0 ? (
          <div className="mr-5"> {renderPagination}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OrderListTable;
