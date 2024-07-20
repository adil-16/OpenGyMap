import React from "react";
import PaymentButton from "../../../components/buttons/Verify";

const Payment = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>
      <div className="border-b border-payment-gray py-1 w-3/4 mb-6"></div>
      <p className="text-md text-payment-gray">
        Add a payment method using our secure
      </p>
      <p className="text-md text-payment-gray">
        payment system, then planning your next trip.
      </p>
      <div className="pt-10">
        <PaymentButton text="Add Payment Method" />
      </div>
    </div>
  );
};

export default Payment;
