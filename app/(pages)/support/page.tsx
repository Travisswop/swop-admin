"use client";
import { useState } from "react";
import Image from "next/image";
import messageData from "@/lib/messageData";
import { Avatar, Button } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import Link from "next/link";
import { IoMdCheckboxOutline } from "react-icons/io";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  message: string;
  date: string;
  time: string;
  name: string;
  image: string;
  messageLeft: string;
  messageRight: string;
};

const Page = () => {
  const [isOpen, setIsOpen] = useState("liveSupport");
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <section className="w-full h-full flex flex-col justify-start items-center">
      <article className="flex justify-start items-center gap-4 w-full">
        <div className="flex justify-center items-center flex-col gap-1">
          <Image
            alt="support"
            src="/support/live.png"
            width={200}
            height={200}
            quality={100}
            onClick={() => setIsOpen("liveSupport")}
            className="cursor-pointer"
          ></Image>
          {isOpen === "liveSupport" && (
            <div className="text-center w-2/3 h-1 bg-[#4b93ff] rounded-3xl"></div>
          )}
        </div>
        <div className="flex justify-center items-center flex-col gap-1">
          <Image
            alt="support"
            src="/support/email.png"
            width={200}
            height={200}
            quality={100}
            onClick={() => setIsOpen("emailSupport")}
            className="cursor-pointer"
          ></Image>
          {isOpen === "emailSupport" && (
            <div className="text-center w-2/3 h-1 bg-[#4b93ff] rounded-3xl"></div>
          )}
        </div>
        <div className="flex justify-center items-center flex-col gap-1">
          <Image
            alt="support"
            src="/support/problem.png"
            width={200}
            height={200}
            quality={100}
            onClick={() => setIsOpen("problemSolve")}
            className="cursor-pointer"
          ></Image>
          {isOpen === "problemSolve" && (
            <div className="text-center w-2/3 h-1 bg-[#4b93ff] rounded-3xl"></div>
          )}
        </div>
      </article>
      {isOpen === "liveSupport" && (
        <article className="relative w-full h-full flex justify-center items-start gap-10 pt-10 rounded-lg">
          <section className="w-[30%] flex justify-center items-center flex-col gap-5 ">
            {messageData.map((message: Message) => (
              <div
                className={cn(
                  "w-full h-[80px] flex justify-start gap-2 items-center bg-white rounded-xl p-4 text-black font-medium cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out",
                  selectedChat === message.id &&
                    "bg-[#4B93FF] shadow-lg text-white hover:bg-[#4B93FF] ",
                )}
                key={message.id}
                onClick={() => setSelectedChat(message.id)}
              >
                <Avatar alt="Remy Sharp" src={message.image} />
                <section className="flex justify-between items-start ">
                  <div>
                    <h2>{message.name}</h2>
                    <p
                      className={cn(
                        "text-xs line-clamp-1 w-1/2 text-gray-400",
                        selectedChat === message.id && "text-white",
                      )}
                    >
                      {message.message}
                    </p>
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-xs  text-gray-500",
                        selectedChat === message.id && "text-white",
                      )}
                    >
                      {message.time}
                    </p>
                  </div>
                </section>
              </div>
            ))}
          </section>
          <section className="sticky top-0 w-[70%]  h-[620px] bg-white flex justify-start items-start flex-col rounded-xl pb-10">
            <article className="w-full bg-[#4b93ff] px-5 py-8 rounded-xl">
              <section className=" w-full  flex justify-between items-center rounded-xl bg-[#4b93ff] ">
                <div className="flex gap-2 items-center w-full  rounded-xl ">
                  <Avatar alt="Remy Sharp" src={messageData[0].image} />
                  <h3>{messageData[0].name}</h3>
                </div>
                <Link href="#">
                  <div className="w-10 h-10 bg-white rounded-full text-black flex justify-center items-center">
                    <CiMenuKebab />
                  </div>
                </Link>
              </section>
            </article>
            <article className="w-full flex justify-between items-start gap-48 px-5 overflow-y-scroll no-scrollbar">
              <section className=" flex justify-center items-start flex-col gap-5 pt-3">
                {messageData.map((message: Message) => (
                  <div
                    key={message.id}
                    className="bg-[#4b93ff] rounded-xl p-4 text-white  text-sm relative"
                  >
                    <p className="flex justify-start gap-2 items-start ">
                      {message.messageLeft}
                    </p>
                    <p className="float-right text-sx pt-2 text-gray-300">
                      {message.time}
                    </p>
                  </div>
                ))}
              </section>
              <section className=" flex justify-center items-end flex-col gap-5 pt-3">
                {messageData.map((message: Message) => (
                  <div
                    key={message.id}
                    className="bg-[#edf4ff] rounded-xl p-4 text-gray-700  text-sm relative"
                  >
                    <p className="flex justify-start gap-2 items-start ">
                      {message.messageRight}
                    </p>
                    <p className="float-right text-sx pt-2 text-gray-400">
                      {message.time}
                    </p>
                  </div>
                ))}
              </section>
            </article>
          </section>
        </article>
      )}
      {isOpen === "problemSolve" && (
        <article className="relative w-full h-full flex justify-center items-start gap-10 pt-10 rounded-lg">
          <section className="w-[30%] flex justify-center items-center flex-col gap-5 ">
            {messageData.map((message: Message) => (
              <div
                className="w-full h-[80px] flex justify-start gap-2 items-center bg-white rounded-xl p-4 text-black font-medium cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
                key={message.id}
              >
                <Avatar alt="Remy Sharp" src={message.image} />
                <section className="flex justify-between items-start ">
                  <div>
                    <h2 className="text-xs">{message.name}</h2>
                    <h3>{`Having problems - help #1007`}</h3>
                    <p className="text-xs line-clamp-1 w-1/2 text-gray-400">
                      {message.message}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs  text-gray-500">{message.time}</p>
                  </div>
                </section>
              </div>
            ))}
          </section>
          <section className="sticky top-0 w-[70%]  h-[620px] bg-white flex justify-start items-start flex-col gap-8 rounded-xl pb-10 border border-black px-10 py-16">
            <div>
              <IoMdCheckboxOutline className="h-10 w-10 text-gray-400" />
            </div>
            <div className="flex justify-between w-[80%] gap-2">
              <h2 className="text-2xl font-semibold text-black">{`Having problems - help #1007`}</h2>
              <Button
                variant="outlined"
                className="border-[#1d9521] text-[#1d9521]"
                sx={{ borderColor: "#1d9521", color: "#1d9521" }}
              >
                Send email
              </Button>
            </div>
            <div>
              <div className="w-full h-[80px] flex justify-start gap-2 items-center bg-white rounded-xl p-4 text-black font-medium cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
                <Avatar alt="Remy Sharp" src={messageData[0].image} />
                <section className="flex justify-between items-start gap-80">
                  <div>
                    <h2 className="">{messageData[0].name}</h2>

                    <p className="text-xs line-clamp-1 text-gray-400">
                      reily_mosana@gmail.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs  text-gray-500">
                      {messageData[0].time}
                    </p>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <p className="text-black -translate-y-5">{`Swop’s Flat Rectangle NFC’s are designed to be durable and simple to use. The Flat is great
to put under any phone case(non-metal) Users can download our app to program any of
our NFC’s with the click of a button. This will attach your profile to the NFC for easy sharing.
You just tap the NFC on any compatible phone to share your digital business card,
microsite, crypto address, the possibilities are endless. Use the swop app to.`}</p>
            </div>
            <div className="w-[30%] flex justify-between items-center">
              <Button
                variant="outlined"
                sx={{ borderColor: "black", color: "black" }}
              >
                Reply
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", color: "black" }}
              >
                Forward
              </Button>
            </div>
          </section>
        </article>
      )}
      {isOpen === "emailSupport" && (
        <article className="relative w-full h-full flex justify-between items-start gap-10 pt-10 rounded-lg">
          <section className="w-[30%] flex justify-center items-center flex-col gap-5 ">
            {messageData.map((message: Message) => (
              <div
                className="w-full h-[80px] flex justify-start gap-2 items-center bg-white rounded-xl p-4 text-black font-medium cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
                key={message.id}
              >
                <Avatar alt="Remy Sharp" src={message.image} />
                <section className="flex justify-between items-start ">
                  <div>
                    <h2 className="text-xs">{message.name}</h2>
                    <h3>{`Having problems - help #1007`}</h3>
                    <p className="text-xs line-clamp-1 w-1/2 text-gray-400">
                      {message.message}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs  text-gray-500">{message.time}</p>
                  </div>
                </section>
              </div>
            ))}
          </section>
          <section className="sticky top-0 w-[70%]  h-[620px] bg-white flex justify-start items-start flex-col gap-8 rounded-xl pb-10 border border-black px-10 py-16">
            <div>
              <IoMdCheckboxOutline className="h-10 w-10 text-gray-400" />
            </div>
            <div className="flex justify-between w-[80%] gap-2">
              <h2 className="text-2xl font-semibold text-black">{`Having problems - help #1007`}</h2>
              <Button
                variant="outlined"
                className="border-[#1d9521] text-[#1d9521]"
                sx={{ borderColor: "#1d9521", color: "#1d9521" }}
              >
                Send email
              </Button>
            </div>
            <div>
              <div className="w-full h-[80px] flex justify-start gap-2 items-center bg-white rounded-xl p-4 text-black font-medium cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
                <Avatar alt="Remy Sharp" src={messageData[0].image} />
                <section className="flex justify-between items-start gap-80">
                  <div>
                    <h2 className="">{messageData[0].name}</h2>

                    <p className="text-xs line-clamp-1 text-gray-400">
                      reily_mosana@gmail.com
                    </p>
                  </div>
                  <div>
                    <p className="text-xs  text-gray-500">
                      {messageData[0].time}
                    </p>
                  </div>
                </section>
              </div>
            </div>
            <div>
              <p className="text-black -translate-y-5">{`Swop’s Flat Rectangle NFC’s are designed to be durable and simple to use. The Flat is great
to put under any phone case(non-metal) Users can download our app to program any of
our NFC’s with the click of a button. This will attach your profile to the NFC for easy sharing.
You just tap the NFC on any compatible phone to share your digital business card,
microsite, crypto address, the possibilities are endless. Use the swop app to.`}</p>
            </div>
            <div className="w-[30%] flex justify-between items-center">
              <Button
                variant="outlined"
                sx={{ borderColor: "black", color: "black" }}
              >
                Reply
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "black", color: "black" }}
              >
                Forward
              </Button>
            </div>
          </section>
        </article>
      )}
    </section>
  );
};

export default Page;
