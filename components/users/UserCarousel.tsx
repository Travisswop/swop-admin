import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";

type Row = {
  id: number;
  date: string;
  name: string;
  image: string;
  email: string;
  payStatus: boolean;
  referrals: string;
  earned: number;
  reference: string;
  userReferralState: boolean;
  phone: string;
  bookingTime: string;
  address: string;
  profession: string;
  swopId: string;
  site: Site[];
};

type Site = {
  id: string;
  smartSite: string;
  dateOfBirth: string;
  solana: string;
  signUpDate: string;
  nfc: string;
  balance: number;
  smartSiteId: string;
  premiumMembership: boolean;
};

const UserCarousel = ({ user }: { user: Row }) => {
  return (
    <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }}>
      <CarouselContent className="-ml-1 h-full ">
        {user?.site.map((el) => (
          <CarouselItem
            key={el.id}
            className="pl-1 md:basis-1/2 lg:basis-1/5 h-full "
          >
            <div className="p-4 h-full ">
              <Card className="h-full rounded-xl shadow-lg  relative cursor-pointer border-2 border-transparent hover:scale-105 hover:border-[#4b93ff] hover:border-2 transition-all duration-300 ease-in-out select-none">
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
                    <Link
                      href={`www.swopme.com/${user?.name.trim().split(" ")[0]}`}
                    >
                      {`www.swopme.com/${user?.name.trim().split(" ")[0]}`}
                    </Link>
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
  );
};

export default UserCarousel;
