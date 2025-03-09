"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import lock from "@/public/images/icons/lock.svg";
import Image from "next/image";

const LoginPasswordInput = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p className="font-medium text-[#575D66] mb-1">Password</p>
      <div className="w-full relative">
        <Image
          src={lock}
          alt=""
          className="absolute top-1/2 -translate-y-1/2 left-3 w-[18px] h-auto"
        />
        <input
          type={show ? "text" : "password"}
          name="password"
          required
          autoComplete="off"
          placeholder="Enter your password"
          className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl bg-white focus:outline-none px-4 py-2 text-gray-700 pl-9"
        />
        <button type="button" onClick={() => setShow(!show)}>
          {show ? (
            <FaEye
              className="absolute top-1/2 -translate-y-[50%] right-4"
              size={18}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-1/2 -translate-y-[50%] right-4"
              size={18}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginPasswordInput;
