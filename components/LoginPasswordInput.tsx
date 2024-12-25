"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface FormErrors {
  formErrors: {
    name?: string;
    email?: string;
    password?: string;
  };
}
const LoginPasswordInput = ({ formErrors }: FormErrors) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p className="font-medium text-[#575D66]">Password</p>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name="password"
          required
          autoComplete="off"
          placeholder="Enter your password"
          className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl bg-white focus:outline-none px-4 py-2 text-gray-700"
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
      {formErrors.password && (
        <p className="text-red-600 text-sm">{formErrors.password}</p>
      )}
    </div>
  );
};

export default LoginPasswordInput;
