"use client";
import React, { FormEvent, useState } from "react";
import swopLogo from "@/public/images/swop-logo.png";
import Image from "next/image";
import LoginPasswordInput from "@/components/LoginPasswordInput";
import { FaLongArrowAltRight } from "react-icons/fa";
import PrimaryButton from "@/components/button/PrimaryButton";
import { login } from "@/action/login";
import { useRouter } from "next/navigation";
import { TbTopologyStar3 } from "react-icons/tb";
import email from "@/public/images/icons/sms-tracking.svg";

const SignInPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      const formData = new FormData(event.currentTarget);

      const payload = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      console.log("payload data", payload);

      const response = await login(payload);

      console.log("response", response);

      if (!response.success) {
        setError(response.message);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("login catch error", err);
    }
  }

  return (
    <main className="overflow-y-auto bg-white text-black">
      <div className="pt-14 pb-20 lg:py-28 h-screen">
        <section className="flex justify-center relative z-10">
          <Image
            src={swopLogo}
            alt="swop-logo"
            width={200}
            priority
            className="w-40 2xl:w-44"
          />
        </section>
        <section className="">
          <div className="flex justify-center">
            <div className="relative lg:w-auto w-[90%] sm:w-[70%] md:w-[60%]">
              <div className="bg-gradient-to-br from-purple-200 to-blue-300 w-52 h-52 rounded-full absolute -bottom-32 -left-16 z-0 opacity-80"></div>
              <div className="bg-gradient-to-br from-purple-200 to-blue-300 w-52 h-52 rounded-full absolute top-0 -right-16 z-0 opacity-80"></div>
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-20 h-20 rounded-full absolute top-32 left-28 z-0"></div>
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-20 h-20 rounded-full absolute -bottom-10 right-14 z-0"></div>
              <div className="bg-[#af87fd] w-12 h-12 rounded-full absolute top-40 left-10 z-0"></div>
              <div className="flex flex-col gap-4 justify-center mt-16 w-full lg:w-[32rem] h-[22rem] relative px-4 lg:px-12 pt-4 lg:pt-12 pb-4 backdrop-blur-[50px] bg-white bg-opacity-25 border shadow-md rounded-xl">
                {
                  <p className="text-red-600 text-sm font-medium text-center absolute top-10 left-1/2 -translate-x-1/2">
                    {error}
                  </p>
                }
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <p className="font-medium text-[#575D66] mb-1">Email</p>
                    <div className="w-full relative">
                      <Image
                        src={email}
                        alt=""
                        className="absolute top-1/2 -translate-y-1/2 left-3"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="off"
                        placeholder="Enter your email address"
                        className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl bg-white focus:outline-none px-4 py-2 text-gray-700 pl-9"
                      />
                    </div>
                  </div>
                  <LoginPasswordInput />
                  <PrimaryButton
                    type="submit"
                    className="flex items-center gap-1 w-max mx-auto px-10 !py-1.5 mt-2"
                    disabled={loading}
                  >
                    <p>Log In</p>
                    {loading ? (
                      <TbTopologyStar3 className="animate-spin" />
                    ) : (
                      <FaLongArrowAltRight />
                    )}
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignInPage;
