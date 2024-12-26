"use client";
import React from "react";
import clsx from "clsx";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;
  /** Additional custom styles */
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  ...props
}) => {
  // Define default styles for the button
  const defaultClasses =
    "px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 flex items-center gap-1 w-max";

  return (
    <button
      className={clsx(defaultClasses, className)} // Merge default styles with custom classes
      {...props} // Spread remaining props (e.g., onClick, type)
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
