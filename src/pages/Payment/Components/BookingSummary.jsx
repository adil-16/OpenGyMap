import React from "react";

const BookingSummary = () => (
  <div>
    <h2 className="text-xl text-custom-black font-semibold mb-4">
      Your Booking
    </h2>
    <div className="mb-6">
      <p className="flex justify-between text-custom-black font-semibold mb-2">
        <span className="font-semibold text-payment-gray mb-2">Court Type</span>{" "}
        Full Court
      </p>
      <p className="flex justify-between text-custom-black font-semibold mb-2">
        <span className="font-semibold text-payment-gray mb-2">Time</span> 09:00
        - 15:00 (6 hours)
      </p>
      <p className="flex justify-between text-custom-black font-semibold">
        <span className="font-semibold text-payment-gray mb-2">Date</span> Feb
        29
      </p>
    </div>
  </div>
);

export default BookingSummary;
