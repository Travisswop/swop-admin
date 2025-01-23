import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import React from "react";

import { Row } from "@/lib/placeholderData";
import { cn } from "@/lib/utils";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
// import { MdOutlineFileDownload } from "react-icons/md";

const OrderHistory = ({
  user,
  selectedSwopId,
}: {
  user: Row;
  selectedSwopId: string;
}) => {
  const selectedSite = user.site.find((site) => site.id === selectedSwopId);
  const [date, setDate] = React.useState("");
  const [name, setName] = React.useState("");
  // const [referralState, setReferralState] = React.useState(true);
  const handleChangeName = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
  };
  const handleChangeAge = (event: SelectChangeEvent) => {
    setDate(event.target.value as string);
  };
  //FLOATING BUTTON

  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null,
  // );

  return (
    <div className="w-full h-full grid grid-cols-2 gap-5 py-10">
      <Card className="col-span-2  px-7 py-5  drop-shadow-[0px_5px_5px_rgba(0,0,0,0.20)]  h-full  border-0 rounded-2xl ">
        <CardHeader className="flex flex-row justify-between items-center col-span-2 p-2 border-b text-black text-2xl float-left w-full">
          <h2> Order History</h2>
          <div
            className={cn(
              "flex flex-row gap-2 2xl:gap-4 w-fit justify-center items-center  text-base",
            )}
          >
            <h2>Filter</h2>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label" className="text-sm p-0">
                Date
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={date}
                label="Date"
                onChange={handleChangeAge}
              >
                <MenuItem value={"ascending"}>Ascending</MenuItem>
                <MenuItem value={"descending"}>Descending</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Name</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={name}
                label="Name"
                onChange={handleChangeName}
                className="text-sm p-0"
              >
                <MenuItem value={"ascending"} className="p-0">
                  Ascending
                </MenuItem>
                <MenuItem value={"descending"}>Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </CardHeader>
        <section className="w-full  col-span-2 h-fit  flex justify-center items-center ">
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
                  <div className=" pt-6 h-full w-full">
                    <Card
                      className={cn(
                        "h-full rounded-xl shadow-none border-0  relative cursor-pointer select-none",
                      )}
                    >
                      <CardContent className="flex flex-col h-full items-center justify-center  pb-0">
                        {el?.image ? (
                          <article className="w-full h-full relative">
                            <Image
                              // src={user?.image}
                              src={el?.image}
                              // src="/images/bg.jpg"
                              alt={el?.name}
                              height={1200}
                              width={1000}
                              className=" w-full h-[150px] object-start object-contain  rounded-t-xl"
                            />
                            <button className="absolute  -translate-x-4 top-0 right-0 text-white bg-black rounded-full p-2  flex justify-center items-center z-20 text-xs ">
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
                        <div className="flex flex-col text-sm justify-center items-center pt-4 pb-4">
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
      </Card>
    </div>
  );
};

export default OrderHistory;
