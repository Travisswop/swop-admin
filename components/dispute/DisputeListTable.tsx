'use client';
import Link from 'next/link';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';

import { getDisputesList } from '@/action/dispute';
import {
  DisputeListItem,
  Pagination as ApiPagination,
} from '@/types/dispute';
import ExportButton from '../order/ExportButton';
import Loader from '../ui/Loader';
import { formatDate } from '../util/formatData';
import TopTabSection from './TopTabSection';

const disputeCategories = [
  { key: 'item_not_received', label: 'Item Not Received' },
  { key: 'item_damaged', label: 'Item Damaged/Defective' },
  { key: 'wrong_item', label: 'Wrong Item Received' },
  { key: 'quality_issues', label: 'Quality Issues' },
  { key: 'shipping_issues', label: 'Shipping Problems' },
  {
    key: 'seller_communication',
    label: 'Seller Communication Issues',
  },
  { key: 'payment_issues', label: 'Payment Problems' },
  { key: 'other', label: 'Other' },
];

// Extended pagination interface for our component needs
interface ComponentPagination extends ApiPagination {
  previousPage: number | null;
  nextPage: number | null;
}

const ITEMS_PER_PAGE = 8;

const DisputeListTable = ({ token }: { token: string }) => {
  // State management
  const [disputesList, setDisputesList] = useState<DisputeListItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] =
    useState<ComponentPagination | null>(null);
  const [sort, setSort] = useState('orderDate:desc');

  // Fetch disputes data
  const fetchDisputes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getDisputesList(token, {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sort,
        search: searchTerm,
      });
      console.log('result', result);
      setDisputesList(result.disputes);
      const apiPagination = result.pagination;
      setPagination({
        ...apiPagination,
        previousPage:
          apiPagination.currentPage > 1
            ? apiPagination.currentPage - 1
            : null,
        nextPage:
          apiPagination.currentPage < apiPagination.totalPages
            ? apiPagination.currentPage + 1
            : null,
      });
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching disputes:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, currentPage, sort, searchTerm]);

  // Effect to fetch data when dependencies change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDisputes();
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [fetchDisputes]);

  // Handle sort change
  const handleSortChange = useCallback((column: string) => {
    setSort((prevSort) => {
      const [field, direction] = prevSort.split(':');
      const newDirection =
        field === column && direction === 'asc' ? 'desc' : 'asc';
      return `${column}:${newDirection}`;
    });
  }, []);

  // Handle pagination
  const handlePaginationClick = useCallback(
    (page: number) => {
      if (
        page > 0 &&
        page !== currentPage &&
        page <= (pagination?.totalPages || 1)
      ) {
        setCurrentPage(page);
      }
    },
    [currentPage, pagination?.totalPages]
  );

  // Render pagination component
  const renderPagination = useMemo(() => {
    if (!pagination || !pagination.totalPages) return null;

    const generatePageNumbers = () => {
      const pageNumbers: number[] = [];
      const startPage = Math.max(1, (currentPage || 1) - 1);
      const endPage = Math.min(
        pagination.totalPages || 1,
        (currentPage || 1) + 1
      );

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
      <nav
        aria-label="Page navigation"
        className="flex justify-end mt-8"
      >
        <ul className="inline-flex -space-x-px text-base items-center">
          {/* Previous button */}
          <li>
            <button
              onClick={() =>
                handlePaginationClick((currentPage || 1) - 1)
              }
              disabled={!pagination.previousPage || currentPage <= 1}
              className="bg-white border rounded-l-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
          </li>

          {/* Page numbers */}
          {pageNumbers.map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePaginationClick(page)}
                className={`px-4 py-2 border h-[42px] w-[45px] ${
                  page === currentPage
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next button */}
          <li>
            <button
              onClick={() =>
                handlePaginationClick((currentPage || 1) + 1)
              }
              disabled={
                !pagination.nextPage ||
                currentPage >= (pagination.totalPages || 1)
              }
              className="px-4 py-2 bg-white border rounded-r-lg text-gray-600 hover:bg-gray-100 h-[42px] w-[90px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }, [pagination, currentPage, handlePaginationClick]);

  // Table headers configuration
  const tableHeaders = useMemo(
    () => [
      { label: 'Order ID', key: 'id' },
      { label: 'Category', key: 'category' },
      { label: 'Seller', key: 'seller' },
      { label: 'Buyer', key: 'buyer' },
      { label: 'Date Initiated', key: 'dateInitiated' },
      { label: 'Dispute Status', key: 'disputeStatus' },
    ],
    []
  );

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl p-9">
      {/* Top Controls */}
      <div className="mb-6 w-full">
        <TopTabSection />
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <div className="w-60 2xl:w-72 relative">
            <input
              type="text"
              className="bg-[#F1F8FF] px-3 py-2 border border-slate-200 rounded-lg text-gray-700 pl-10 focus:outline-none w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <p className="text-gray-800 font-medium capitalize">
            Filter
          </p>
          <button
            onClick={() => handleSortChange('orderDate')}
            className="cursor-pointer select-none px-2 py-2 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-center gap-1 w-32 transition"
          >
            Sort
            {sort.startsWith('orderDate') && (
              <FaArrowUpLong
                className={`text-gray-600 size-4 ${
                  sort === 'orderDate:asc' ? 'rotate-0' : 'rotate-180'
                }`}
              />
            )}
          </button>
          {/* @ts-expect-error ExportButton expects Order[] but we're passing DisputeListItem[] */}
          <ExportButton ordersList={disputesList} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center py-4 bg-red-50 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-500 border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium border-b">
            <tr>
              {tableHeaders.map((header, idx) => (
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
            {isLoading ? (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center w-full h-[400px]"
                >
                  <div className="flex items-center justify-center w-full h-full space-x-2 text-gray-900">
                    <Loader size={'size-7'} color={'fill-primary'} />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : disputesList?.length > 0 ? (
              disputesList.map((dispute) => (
                <tr
                  key={dispute.id}
                  className="odd:bg-white even:bg-gray-50 border-b text-gray-800 text-sm"
                >
                  <td className="px-6 py-4 text-center">
                    <Link href={`/dispute/${dispute.id}`}>
                      {dispute.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center capitalize">
                    <Link href={`/dispute/${dispute.id}`}>
                      {
                        disputeCategories.find(
                          (category) =>
                            category.key ===
                            dispute.disputeDetails.category
                        )?.label
                      }
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">{'N/A'}</td>
                  <td className="px-6 py-4 text-center">{'N/A'}</td>
                  <td className="px-6 py-4 text-center">
                    <Link href={`/dispute/${dispute.id}`}>
                      {formatDate(dispute.dates.createdAt)}
                    </Link>
                  </td>
                  <td className="py-4 break-all text-center flex items-center justify-center space-x-1">
                    <Link href={`/dispute/${dispute.id}`}>
                      <button className="cursor-pointer select-none px-2 py-1.5 text-base font-normal text-gray-700 bg-white border border-yellow-400 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-center gap-1 transition">
                        <GoDotFill
                          className={`size-4 ${
                            dispute.disputeDetails.status ===
                            'pending'
                              ? 'text-yellow-400'
                              : 'text-green-400'
                          }`}
                        />
                        <span>{dispute.disputeDetails.status}</span>
                      </button>
                    </Link>
                    <BsThreeDotsVertical className="text-gray-500 size-4 cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center w-full h-[400px]"
                >
                  No disputes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {disputesList?.length > 0 && renderPagination}
      </div>
    </div>
  );
};

export default DisputeListTable;
