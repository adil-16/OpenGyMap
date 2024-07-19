import React from "react";

const PriceSummary = () => (
  <div className="mb-6">
    <h3 className="text-xl text-custom-black font-semibold mb-4">
      Price Summary
    </h3>
    <p className="flex justify-between">
      <span className="text-payment-gray mb-2 font-semibold">
        Number of booked hours
      </span>{" "}
      <span className="text-custom-black font-semibold mb-4">6</span>
    </p>
    <p className="flex justify-end text-custom-black font-semibold mb-4">
      6 × 12 = $7
    </p>
    <p className="flex justify-between mb-2">
      <span className="text-payment-gray font-semibold">Service Fee</span>{" "}
      <span className="flex justify-between text-custom-black font-semibold mb-2">
        $12.14 (15%)
      </span>
    </p>
    <div className="border-b border-navbar-gray mb-8"></div>
    <p className="flex justify-between font-semibold text-custom-black text-lg">
      <span>Total Amount</span> <span>$84.14</span>
    </p>
  </div>
);

export default PriceSummary;
