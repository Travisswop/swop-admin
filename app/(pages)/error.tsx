"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-2 text-black">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
