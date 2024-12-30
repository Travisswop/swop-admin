"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import data from "@/lib/placeholderData";
import { Avatar } from "@mui/material";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaCheck, FaUsers } from "react-icons/fa";
import PersonalInfo from "@/components/users/PersonalInfo";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import OrderHistory from "@/components/users/OrderHistory";
import Shipping from "@/components/users/Shipping";

const Page = () => {
  const [selectedSwopId, setSelectedSwopId] = React.useState("");
  const { userId } = useParams();
  const user = data.find((user) => user.id === Number(userId));
  if (user && selectedSwopId === "") {
    setSelectedSwopId(user?.site[0].id);
  }
  return (
    <section className="w-full min-h-svh no-scrollbar flex flex-col justify-start items-center text-[#737791] bg-white overflow-hidden">
      {user?.image ? (
        <article className="w-full h-[200px] relative">
          <Image
            // src={user?.image}
            src="/images/bgimage.png"
            // src="/images/bg.jpg"
            alt={user?.name}
            height={1200}
            width={1000}
            className="absolute top-0 w-full h-[200px] object-start object-cover"
          />
          <button className="absolute top-4 right-4 text-white  bg-black px-4 py-2 rounded-xl w-28 flex justify-center items-center z-20 group transition-all duration-300 ease-in-out">
            <span>Export</span>&nbsp;{" "}
            <MdOutlineFileDownload className="h-5 w-5 group-hover:-rotate-90  transition-all duration-300 ease-in-out " />
          </button>
        </article>
      ) : (
        <article className="w-full h-[200px] relative">
          <Image
            src="/images/bgimage.png"
            alt="loading..."
            height={1000}
            width={1000}
            className="absolute top-0 w-full h-[200px] object-start object-cover"
          />
          <button className="absolute top-4 right-4 text-white  bg-black px-4 py-2 rounded-xl w-28 flex justify-center items-center z-20 group transition-all duration-300 ease-in-out">
            <span>Export</span>&nbsp;{" "}
            <MdOutlineFileDownload className="h-5 w-5 group-hover:-rotate-90  transition-all duration-300 ease-in-out " />
          </button>
        </article>
      )}

      <article className="w-full flex  justify-start items-center h-[200px]">
        <section className="flex flex-col justify-center items-center gap-4 px-10 -translate-y-10">
          {user?.image ? (
            <Avatar
              src={user?.image}
              alt={user?.name}
              sx={{ width: 120, height: 120, border: "10px solid ##737373" }}
              className="border-2 border-stone-400 shadow-md rounded-full"
            />
          ) : (
            <Avatar sx={{ width: 120, height: 120 }}>
              <FaUsers />
            </Avatar>
          )}
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-black">{user?.name}</h2>
            <a
              target="_blank"
              href={`http://www.swopme.com/${user?.name.trim().split(" ")[0]}`}
            >
              {`www.swopme.com/${user?.name.trim().split(" ")[0]}`}
            </a>
          </div>
        </section>
        <section className="w-full h-full  flex justify-start items-center">
          {/* <UserCarousel user={user} /> */}
          <Carousel
            className="w-full h-full"
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent className="-ml-1 h-full ">
              {user?.site.map((el) => (
                <CarouselItem
                  key={el.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/5 h-full "
                >
                  <div className="p-4 h-full ">
                    <Card
                      className={cn(
                        "h-full rounded-xl shadow-lg  relative cursor-pointer border-2 border-transparent hover:scale-105 hover:border-[#4b93ff] hover:border-2 transition-all duration-300 ease-in-out select-none",
                        selectedSwopId === el.id && "border-2 border-[#4b93ff]"
                      )}
                      onClick={() => setSelectedSwopId(el.id)}
                    >
                      <CardContent className="flex flex-col h-full items-center justify-center p-0 ">
                        {user?.image ? (
                          <article className="w-full h-full relative">
                            <Image
                              // src={user?.image}
                              src="/images/bgimage.png"
                              // src="/images/bg.jpg"
                              alt={user?.name}
                              height={1200}
                              width={1000}
                              className="absolute top-0 w-full h-[70px] object-start object-cover rounded-t-xl"
                            />
                            <button
                              className={cn(
                                "absolute translate-y-28  right-4 text-white  bg-black rounded-full p-2  flex justify-center items-center z-20 group transition-all duration-300 ease-in-out",
                                selectedSwopId === el.id && "bg-[#4b93ff]",
                                selectedSwopId !== el.id && "hidden"
                              )}
                            >
                              <FaCheck className="h-4 w-4 group-hover:-rotate-90  transition-all duration-300 ease-in-out " />
                            </button>
                          </article>
                        ) : (
                          <article className="w-full  relative">
                            <Image
                              src="/images/bgimage.png"
                              alt="loading..."
                              height={1000}
                              width={1000}
                              className="absolute top-0 w-full h-[50px] object-start object-cover"
                            />
                          </article>
                        )}
                        {user?.image ? (
                          <Avatar
                            src={user?.image}
                            alt={user?.name}
                            sx={{
                              width: 80,
                              height: 80,
                              border: "10px solid ##737373",
                            }}
                            className="border-2 border-white shadow-md rounded-full"
                          />
                        ) : (
                          <Avatar
                            sx={{ width: 80, height: 80 }}
                            className="border-2 border-white shadow-md rounded-full"
                          >
                            <FaUsers />
                          </Avatar>
                        )}
                        <div className="flex flex-col text-sm justify-center items-center pt-2 pb-4">
                          <h2 className="text-lg text-black">{user?.name}</h2>

                          {`www.swopme.com/${user?.name.trim().split(" ")[0]}`}
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
      </article>

      <article className="w-full px-12">
        <div className="w-full h-0.5 bg-[#b7b9c5] my-8 px-10 m-auto"></div>
      </article>
      <article className="w-full px-12">
        {user && user?.site.length > 0 ? (
          <PersonalInfo user={user} selectedSwopId={selectedSwopId} />
        ) : (
          <div>No Info....</div>
        )}
      </article>
      <article className="w-full px-12">
        <div className="w-full h-0.5 bg-[#b7b9c5] my-8 px-10 m-auto"></div>
      </article>
      <article className="w-full px-12">
        {user && user?.site.length > 0 ? (
          <OrderHistory user={user} selectedSwopId={selectedSwopId} />
        ) : (
          <div>No Info....</div>
        )}
      </article>
      <article className="w-full px-12">
        <div className="w-full h-0.5 bg-[#b7b9c5] my-8 px-10 m-auto"></div>
      </article>
      <article className="w-full px-12 mb-20">
        {user && user?.site.length > 0 ? (
          <Shipping user={user} selectedSwopId={selectedSwopId} />
        ) : (
          <div>No Info....</div>
        )}
      </article>
    </section>
  );
};

export default Page;
