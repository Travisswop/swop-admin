import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import React from "react";

import { Row } from "@/lib/placeholderData";
import { cn } from "@/lib/utils";

const OrderHistory = ({
  user,
  selectedSwopId,
}: {
  user: Row;
  selectedSwopId: string;
}) => {
  const selectedSite = user.site.find((site) => site.id === selectedSwopId);

  return (
    <div className="w-full h-full grid grid-cols-2 gap-5">
      <h2 className="col-span-2 text-black text-2xl float-left w-full">
        Order History
      </h2>
      <section className="w-full col-span-2 h-[250px]  flex justify-center items-center ">
        {/* <UserCarousel user={user} /> */}
        <Carousel
          className="w-full h-full"
          opts={{ loop: true, align: "center" }}
        >
          <CarouselContent className="-ml-1 h-full ">
            {selectedSite?.order.map((el) => (
              <CarouselItem
                key={el.id}
                className="pl-1 md:basis-1/2 lg:basis-1/5 h-full "
              >
                <div className="p-4 h-full w-full">
                  <Card
                    className={cn(
                      "h-full rounded-xl shadow-lg  relative cursor-pointer   select-none"
                    )}
                  >
                    <CardContent className="flex flex-col h-full items-center justify-center p-2 ">
                      {el?.image ? (
                        <article className="w-full h-full relative">
                          <Image
                            // src={user?.image}
                            src={el?.image}
                            // src="/images/bg.jpg"
                            alt={el?.name}
                            height={1200}
                            width={1000}
                            className="absolute top-4 bottom-0 left-0 right-0 w-full h-[100px] object-start object-contain rounded-t-xl"
                          />
                          <button className="absolute -translate-y-6 translate-x-4 top-0 right-0 text-white bg-black rounded-full p-2  flex justify-center items-center z-20 text-xs ">
                            <p className="rounded-full h-4 w-4 flex justify-center items-center ">
                              {el?.quantity}
                            </p>
                          </button>
                          {/* <Avatar className="absolute top-0 left-0   rounded-full  flex justify-center items-center z-20 text-xs bg-black"></Avatar>
                          <Avatar>
                            <AvatarFallback>
                              <p className="text-white ">{el?.quantity}</p>
                            </AvatarFallback>
                          </Avatar> */}
                        </article>
                      ) : (
                        <div>no order</div>
                      )}
                      <div className="flex flex-col text-sm justify-center items-center pt-2 pb-4">
                        <h2 className="text-lg text-black">{el?.name}</h2>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
  <CarouselNext /> */}
        </Carousel>
      </section>
    </div>
  );
};

export default OrderHistory;
