"use client";
import Image from "next/image";
import { idShorter } from "../util/idShorter";

interface OrderDetailsProps {
  orderDetails: {
    collections: {
      image: string;
      name: string;
      description: string;
      NFTType: string;
      price: number;
      ownerAddress: string;
    }[];
    order: {
      mintedNfts: {
        nftTemplateId: {
          image: string;
          name: string;
          description: string;
          nftType: string;
          price: string;
          ownerAddress: string;
        };
      }[];
      sellerId: string;
      buyerId: string;
      txResult: {
        hash: string;
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

const OrderDetails = ({ orderDetails }: OrderDetailsProps) => {
  return (
    <div className="p-8 xl:p-10 text-black bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Order Information</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left side */}
        <div className="">
          <div className=" grid grid-cols-1 gap-6 h-[70svh] overflow-y-auto">
            {/* shadow-[0px_2px_16px_rgba(0,0,0,0.15)] */}
            {orderDetails?.order?.mintedNfts?.map((product, index) => (
              <div
                key={index}
                className="user-card border-2 border-gray-200 p-6 2xl:p-8 rounded-lg bg-white "
              >
                <div className=" flex gap-4 items-center pb-5 border-b mb-5">
                  <Image
                    src={product?.nftTemplateId?.image}
                    alt={`${product?.nftTemplateId?.name}'s profile`}
                    width={80}
                    height={80}
                    className="border-2 border-white shadow-md rounded-full"
                  />
                  <div>
                    <h2 className="text-xl 2xl:text-2xl font-semibold text-black mb-1">
                      {product?.nftTemplateId?.name}
                    </h2>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-lg font-semibold text-[#424651] mb-1">
                    Details
                  </p>
                  <p className="text-[#686B74] text-base font-normal">
                    {product?.nftTemplateId?.description}
                  </p>
                </div>
                <div className="mb-4 ">
                  <p className="text-lg font-semibold text-[#424651] mb-1">
                    NFT Type:
                  </p>
                  <p className="text-[#686B74] text-base font-normal">
                    {product?.nftTemplateId?.nftType}
                  </p>
                </div>
                {/* <div className="mb-4 ">
                  <p className="text-lg font-semibold text-[#424651] mb-1">
                    Price in ETH::
                  </p>
                  <p className="text-[#686B74] text-base font-normal flex items-center gap-2">
                    <span>
                      <FaEthereum size={16} />
                    </span>
                    {product?.nftTemplateId?.price}
                  </p>
                </div> */}

                <div className=" ">
                  <p className="text-lg font-semibold text-[#424651] mb-1">
                    Address:
                  </p>
                  <p className="text-[#686B74] text-base font-normal">
                    {product?.nftTemplateId?.ownerAddress}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className=" flex flex-col gap-8 xl:gap-10">
          <div className="flex justify-between items-center ">
            <div>
              <h5 className="text-xl font-medium mb-4">Seller ID</h5>
              <div className="flex items-center gap-2">
                {/* <Image
                  src="https://img.freepik.com/free-photo/side-view-man-with-smartphone-laptop-outside_23-2148578271.jpg?t=st=1741760899~exp=1741764499~hmac=eb1e401ad7bcde5dfad18d498b49e536b51376da5cc25d5c45ab2b424173aeb2&w=740"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full w-10 h-auto"
                ></Image> */}
                <p className=" text-gray-800 text-lg">
                  {" "}
                  {orderDetails?.order?.sellerId}
                </p>
              </div>
            </div>
            <div>
              <h5 className="text-xl font-medium mb-2">Buyer ID</h5>
              <div className="flex items-center gap-2">
                {/* <Image
                  src="https://img.freepik.com/free-photo/view-3d-businessman_23-2150710046.jpg?t=st=1741761830~exp=1741765430~hmac=da1d30dd5f522f7fbdb5822f1f3e9ed307f563b89ed27015c6869c5d92b3c4f0&w=740"
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full w-10 h-auto"
                ></Image> */}
                <p className=" text-gray-800 text-lg">
                  {orderDetails?.order?.buyerId}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-medium mb-2">Transaction hash</h5>
            <p className=" text-gray-800 text-lg">
              {idShorter(orderDetails?.order?.txResult?.hash)}
            </p>
          </div>
          <div>
            <h5 className="text-lg font-medium mb-2">Order Summary</h5>
            <ul>
              <li className="flex justify-between items-center pt-4 border-t mt-5">
                <p className=" text-gray-500 text-lg">Sub Total</p>
                <p className=" text-gray-800 text-lg font-medium">
                  ${orderDetails?.order?.financial?.subtotal}
                </p>
              </li>
              <li className="flex justify-between items-center pt-4 border-t mt-5">
                <p className=" text-gray-500 text-lg"> Discount</p>
                <p className=" text-gray-800 text-lg font-medium">
                  ${orderDetails?.order?.financial?.discountRate}
                </p>
              </li>
              <li className="flex justify-between items-center pt-4 border-t mt-5">
                <p className=" text-gray-500 text-lg">Shipping</p>
                <p className=" text-gray-800 text-lg font-medium">
                  {" "}
                  ${orderDetails?.order?.financial?.shippingCost}
                </p>
              </li>
              <li className="flex justify-end items-center gap-16 pt-4 border-t mt-5">
                <p className=" text-gray-800 text-lg font-medium">Total</p>
                <p className=" text-gray-800 text-lg font-medium">
                  {" "}
                  ${orderDetails?.order?.financial?.totalCost}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
