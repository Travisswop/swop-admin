'use client';

import { DisputeDetailsResponse } from '@/types/dispute';
import {
  IoDocumentTextOutline,
  IoImageOutline,
} from 'react-icons/io5';
import DocumentViewer from './DocumentViewer';
import { useState } from 'react';
import { Document } from '@/types/dispute';
import Image from 'next/image';
import {
  resolveDisputeForSeller,
  resolveDisputeForBuyer,
} from '@/action/dispute';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const DisputeDetials = ({
  disputDetails,
  token,
}: {
  disputDetails: DisputeDetailsResponse;
  token: string;
}) => {
  console.log('check details page data ', disputDetails);

  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    null
  );

  // Generate resolution timeline based on dispute data
  const generateResolutionTimeline = () => {
    const timeline = [];

    // Add initial dispute creation
    if (disputDetails?.dispute) {
      timeline.push({
        avatarUrl:
          'https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg',
        name: disputDetails?.parties?.buyer?.name || 'Buyer',
        label: 'Dispute Filed',
        date: formatDate(disputDetails?.dispute?.createdAt),
        message: `Dispute reason: ${disputDetails?.dispute?.reason}`,
        type: 'dispute',
      });
    }

    // Add seller challenge if exists
    if (disputDetails?.dispute?.sellerChallenge) {
      timeline.push({
        avatarUrl:
          'https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg',
        name: disputDetails?.parties?.seller?.name || 'Seller',
        label: 'Seller Challenge',
        date: formatDate(
          disputDetails?.dispute?.sellerChallenge?.submittedAt
        ),
        message: `Seller response: ${disputDetails?.dispute?.sellerChallenge?.response}`,
        type: 'challenge',
      });
    }

    // Add resolution if dispute is resolved
    if (
      disputDetails?.dispute?.status === 'resolved' &&
      disputDetails?.dispute?.resolution
    ) {
      const resolution = disputDetails.dispute.resolution;
      const resolutionMessage =
        resolution.winner === 'seller'
          ? `Dispute resolved in favor of seller. Payout amount: $${resolution.payoutAmount}`
          : `Dispute resolved in favor of buyer. Refund amount: $${resolution.refundAmount}`;

      timeline.push({
        avatarUrl:
          'https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg',
        name: 'Admin',
        label: 'Dispute Resolved',
        date: formatDate(resolution.resolvedAt),
        message: resolutionMessage,
        type: 'resolution',
      });
    }

    // Add resolution status
    if (disputDetails?.dispute?.status) {
      timeline.push({
        avatarUrl:
          'https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg',
        name: 'Admin',
        label: 'Status Update',
        date: formatDate(
          disputDetails?.dispute?.updatedAt ||
            disputDetails?.dispute?.createdAt
        ),
        message: `Dispute status: ${disputDetails?.dispute?.status}`,
        type: 'status',
      });
    }

    return timeline;
  };

  const resolutionTimeline = generateResolutionTimeline();

  // Remove local resolveDisputeForSeller and resolveDisputeForBuyer

  const handlePayout = async () => {
    if (!disputDetails?.dispute?.id) {
      setError('Dispute ID not found');
      return;
    }

    if (!token) {
      setError('Admin token not found');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await resolveDisputeForSeller(
        token || '',
        disputDetails.dispute.id,
        'After reviewing the evidence, we have decided in favor of the seller. Payment has been released.'
      );

      setSuccessMessage(
        'Dispute resolved in favor of seller. Payment has been released.'
      );
      // Optionally refresh the page or update the dispute status
    } catch (error) {
      setError(
        'Failed to resolve dispute for seller. Please try again.'
      );
      console.error('Payout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!disputDetails?.dispute?.id) {
      setError('Dispute ID not found');
      return;
    }

    if (!token) {
      setError('Admin token not found');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await resolveDisputeForBuyer(
        token,
        disputDetails.dispute.id,
        'After reviewing your dispute, we have decided in your favor. A full refund has been processed.'
      );

      setSuccessMessage(
        'Dispute resolved in favor of buyer. Full refund has been processed.'
      );
      // Optionally refresh the page or update the dispute status
    } catch (error) {
      setError(
        'Failed to resolve dispute for buyer. Please try again.'
      );
      console.error('Refund error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimelineItemClassName = (type: string) => {
    switch (type) {
      case 'dispute':
        return 'border-red-200 bg-red-50';
      case 'challenge':
        return 'border-yellow-200 bg-yellow-50';
      case 'resolution':
        return 'border-green-200 bg-green-50';
      case 'status':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200';
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-800 border-green-700 bg-green-100';
      case 'rejected':
        return 'text-red-800 border-red-700 bg-red-100';
      case 'challenged':
        return 'text-yellow-800 border-yellow-700 bg-yellow-100';
      default:
        return 'text-gray-800 border-gray-700 bg-gray-100';
    }
  };

  return (
    <div className=" bg-white p-9">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dispute Details */}
        <div className="">
          <div className="">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Dispute Details
            </h2>

            <div className="bg-white border p-6 rounded shadow">
              <div className="mb-4">
                <p className="text-sm text-gray-800">
                  Services/Item Details
                </p>
                <p className="font-medium capitalize text-gray-800">
                  {disputDetails?.dispute?.category}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Order ID</p>
                <p className="font-medium text-blue-600 underline cursor-pointer">
                  {disputDetails?.order?.orderId}
                </p>
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="mb-4">
                <p className="text-sm text-gray-800">Buyer Name</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.buyer?.name}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Buyer Email</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.buyer?.email}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Buyer Phone</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.buyer?.phone}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Buyer Wallet</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.buyer?.wallet?.ens ||
                    disputDetails?.parties?.buyer?.wallet?.address}
                </p>
              </div>
              {disputDetails?.parties?.buyer?.address && (
                <div className="mb-4">
                  <p className="text-sm text-gray-800">
                    Buyer Address
                  </p>
                  <p className="font-medium text-gray-800">
                    {disputDetails?.parties?.buyer?.address?.line1}
                  </p>
                </div>
              )}

              <hr className="my-3 border-gray-200" />

              <div className="mb-4">
                <p className="text-sm text-gray-800">Seller Name</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.seller?.name}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Seller Email</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.seller?.email}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Seller Phone</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.seller?.phone}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Seller Wallet</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.parties?.seller?.wallet?.ens ||
                    disputDetails?.parties?.seller?.wallet?.address}
                </p>
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="mb-4">
                <p className="text-sm text-gray-800">
                  Dispute Reason
                </p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.dispute?.reason}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">
                  Type of Dispute
                </p>
                <p className="font-medium capitalize text-gray-800">
                  {disputDetails?.dispute?.category}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Priority</p>
                <p className="font-medium capitalize text-gray-800">
                  {disputDetails?.dispute?.priority}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">
                  Request Details
                </p>
                <p className="text-sm text-gray-800 mt-1">
                  {disputDetails?.dispute?.description}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-800">Created At</p>
                <p className="text-sm text-gray-800 mt-1">
                  {formatDate(disputDetails?.dispute?.createdAt)}
                </p>
              </div>
              <div className="mt-6 flex gap-3 flex-wrap">
                {disputDetails?.dispute?.documents?.map(
                  (el, index) => (
                    <div
                      key={index}
                      className="text-sm px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 flex items-center space-x-2 cursor-pointer text-gray-800"
                      onClick={() => setSelectedDocument(el)}
                    >
                      {el.fileType === 'jpeg' ||
                      el.fileType === 'jpg' ||
                      el.fileType === 'png' ? (
                        <>
                          <IoImageOutline className="size-5 text-gray-900" />
                          <span>{el?.fileName || 'Image'}</span>
                        </>
                      ) : (
                        <>
                          <IoDocumentTextOutline className="size-5 text-gray-900" />
                          <span>{el?.fileName || 'Document'}</span>
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Seller Challenge Section */}
          {disputDetails?.dispute?.sellerChallenge && (
            <div className="mt-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Seller Challenge
              </h2>

              <div className="bg-white border p-6 rounded shadow">
                <div className="mb-4">
                  <p className="text-sm text-gray-800">Response</p>
                  <p className="font-medium text-gray-800">
                    {
                      disputDetails?.dispute?.sellerChallenge
                        ?.response
                    }
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-800">Category</p>
                  <p className="font-medium capitalize text-gray-800">
                    {
                      disputDetails?.dispute?.sellerChallenge
                        ?.category
                    }
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-800">
                    Evidence Description
                  </p>
                  <p className="font-medium text-gray-800">
                    {
                      disputDetails?.dispute?.sellerChallenge
                        ?.evidenceDescription
                    }
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-800">
                    Requested Action
                  </p>
                  <p className="font-medium capitalize text-gray-800">
                    {
                      disputDetails?.dispute?.sellerChallenge
                        ?.requestedAction
                    }
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-800">Status</p>
                  <p className="font-medium capitalize text-gray-800">
                    {disputDetails?.dispute?.sellerChallenge?.status}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-800">
                    Submitted At
                  </p>
                  <p className="text-sm text-gray-800 mt-1">
                    {formatDate(
                      disputDetails?.dispute?.sellerChallenge
                        ?.submittedAt
                    )}
                  </p>
                </div>
                {disputDetails?.dispute?.sellerChallenge
                  ?.additionalNotes && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-800">
                      Additional Notes
                    </p>
                    <p className="font-medium text-gray-800">
                      {
                        disputDetails?.dispute?.sellerChallenge
                          ?.additionalNotes
                      }
                    </p>
                  </div>
                )}

                {/* Seller Challenge Documents */}
                {disputDetails?.dispute?.sellerChallenge?.documents &&
                  disputDetails?.dispute?.sellerChallenge?.documents
                    .length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-800 mb-3">
                        Evidence Documents
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {disputDetails?.dispute?.sellerChallenge?.documents?.map(
                          (el, index) => (
                            <div
                              key={index}
                              className="text-sm px-4 py-2 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 flex items-center space-x-2 cursor-pointer text-gray-800"
                              onClick={() => setSelectedDocument(el)}
                            >
                              {el.fileType === 'jpeg' ||
                              el.fileType === 'jpg' ||
                              el.fileType === 'png' ? (
                                <>
                                  <IoImageOutline className="size-5 text-gray-900" />
                                  <span>
                                    {el?.fileName || 'Image'}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <IoDocumentTextOutline className="size-5 text-gray-900" />
                                  <span>
                                    {el?.fileName || 'Document'}
                                  </span>
                                </>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Product Details Section */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Product Details
            </h2>

            <div className="bg-white border rounded shadow">
              {/* Order Items Table */}
              <div className="mb-4 overflow-x-auto max-w-6xl">
                <table className="w-full text-left border border-red-800 rounded-lg overflow-hidden">
                  <thead className="text-base font-medium text-gray-700 bg-gray-50">
                    <tr>
                      {['Product Name', 'Quantity', 'Price'].map(
                        (header, idx) => (
                          <th
                            key={idx}
                            className="px-6 py-3 border-gray-200"
                          >
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
                            <td className="py-4 pl-10">
                              {product?.quantity}
                            </td>
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
        </div>

        {/* Resolution Panel */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Resolution
          </h2>

          <div className="bg-white p-6 border rounded shadow">
            <div className="flex justify-between flex-wrap space-x-6">
              <div className="flex-1">
                <p className="text-sm text-gray-800">Dispute ID</p>
                <p className="font-medium text-gray-800">
                  {disputDetails?.dispute?.id}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">Created</p>
                <p className="font-medium text-gray-800">
                  {formatDate(disputDetails?.dispute?.createdAt)}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Resolution Status
                </p>
                <span
                  className={`inline-block px-3 py-1 text-sm border rounded mt-1 capitalize ${getStatusClassName(
                    disputDetails?.dispute?.status
                  )}`}
                >
                  {disputDetails?.dispute?.status}
                </span>
              </div>
            </div>

            {/* Winner Display */}
            {disputDetails?.dispute?.status === 'resolved' &&
              disputDetails?.dispute?.resolution && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">
                        🏆 Winner Declared
                      </h3>
                      <p className="text-green-700 font-medium">
                        {disputDetails?.dispute?.resolution
                          ?.winner === 'seller'
                          ? `${disputDetails?.parties?.seller?.name} (Seller)`
                          : `${disputDetails?.parties?.buyer?.name} (Buyer)`}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Resolution Type:{' '}
                        {disputDetails?.dispute?.resolution?.resolutionType?.replace(
                          '_',
                          ' '
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">
                        Resolved on{' '}
                        {formatDate(
                          disputDetails?.dispute?.resolution
                            ?.resolvedAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            <div className="flex justify-between flex-wrap space-x-6 mt-6">
              <div className="mb-6 flex-1">
                <p className="text-sm text-gray-800">
                  Dispute Status
                </p>
                <p className="font-medium capitalize text-gray-800">
                  {disputDetails?.dispute?.status === 'resolved'
                    ? 'Resolved'
                    : disputDetails?.dispute?.status}
                </p>
              </div>
              <div className="mb-6 flex-1">
                <p className="text-sm text-gray-800">
                  {disputDetails?.dispute?.status === 'resolved' &&
                  disputDetails?.dispute?.resolution?.winner ===
                    'seller'
                    ? 'Payout Amount'
                    : 'Amount Refunded'}
                </p>
                <p className="font-medium text-green-600">
                  ${' '}
                  {disputDetails?.dispute?.status === 'resolved' &&
                  disputDetails?.dispute?.resolution
                    ? disputDetails?.dispute?.resolution?.winner ===
                      'seller'
                      ? disputDetails?.dispute?.resolution
                          ?.payoutAmount
                      : disputDetails?.dispute?.resolution
                          ?.refundAmount
                    : disputDetails?.order?.financial?.totalCost}
                </p>
              </div>
            </div>

            {/* Resolution Details */}
            {disputDetails?.dispute?.status === 'resolved' &&
              disputDetails?.dispute?.resolution && (
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-md font-medium text-gray-800 mb-3">
                    Resolution Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Resolution Type</p>
                      <p className="font-medium text-gray-800 capitalize">
                        {disputDetails?.dispute?.resolution?.resolutionType?.replace(
                          '_',
                          ' '
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payout Status</p>
                      <p className="font-medium text-gray-800 capitalize">
                        {
                          disputDetails?.dispute?.resolution
                            ?.payoutTransaction?.status
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Refund Status</p>
                      <p className="font-medium text-gray-800 capitalize">
                        {
                          disputDetails?.dispute?.resolution
                            ?.refundTransaction?.status
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Processed At</p>
                      <p className="font-medium text-gray-800">
                        {disputDetails?.dispute?.resolution
                          ?.payoutTransaction?.processedAt
                          ? formatDate(
                              disputDetails?.dispute?.resolution
                                ?.payoutTransaction?.processedAt
                            )
                          : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* Admin Response */}
            {disputDetails?.dispute?.response && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-md font-medium text-blue-800 mb-2">
                  Admin Response
                </h3>
                <p className="text-blue-700">
                  {disputDetails?.dispute?.response}
                </p>
                {disputDetails?.dispute?.responseDate && (
                  <p className="text-sm text-blue-600 mt-2">
                    Responded on{' '}
                    {formatDate(disputDetails?.dispute?.responseDate)}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {disputDetails?.dispute?.status !== 'resolved' && (
              <>
                <div className="border-b text-gray-800 w-full my-4" />
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 mb-3">
                    Declare Winner
                  </h3>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}

                  {/* Success Message */}
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {successMessage}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handlePayout}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white`}
                    >
                      {isLoading
                        ? 'Processing...'
                        : 'Payout to Seller'}
                    </button>
                    <button
                      onClick={handleRefund}
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {isLoading
                        ? 'Processing...'
                        : 'Refund to Buyer'}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="border-b text-gray-800 w-full my-4 " />

            <div className="mb-6 flex justify-between items-center ">
              <div className="">
                <h3 className="text-md font-medium text-gray-800">
                  Resolution History
                </h3>
                <p className="text-sm text-gray-800">
                  Please see below for dispute timeline
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {resolutionTimeline?.map((el, index) => (
                <div
                  className="flex items-start gap-3 mb-6 "
                  key={index}
                >
                  <Image
                    src={el?.avatarUrl}
                    alt={el?.name}
                    className="w-10 h-10 rounded-full object-cover"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-gray-800">
                      {el?.name}
                    </p>
                    <div
                      className={`border rounded-lg px-4 py-3 bg-white shadow-sm ${getTimelineItemClassName(
                        el?.type
                      )}`}
                    >
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
                      <p className="text-sm text-gray-800">
                        {el?.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default DisputeDetials;
