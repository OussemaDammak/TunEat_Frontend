"use client";

import { useEffect } from "react";

export default function Cancel() {
  useEffect(() => {
    console.log("Payment canceled!");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-bold text-red-600">Payment Canceled ❌</h1>
      <p>Your payment was not completed.</p>
    </div>
  );
}
