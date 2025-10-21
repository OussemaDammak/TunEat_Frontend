"use client";

import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    console.log("Payment successful!");
    // You can also call your backend to record the payment here
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
      <p>Thank you for supporting the chef!</p>
    </div>
  );
}
