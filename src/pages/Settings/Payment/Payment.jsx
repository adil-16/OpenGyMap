import React, { useState } from "react";
import PaymentButton from "../components/PaymentButton";
import AddPaymentDetails from "./AddPaymentDetails/AddPaymentDetails";
import SavedPaymentMethod from "../components/SavedPaymentMethod";

const Payment = () => {
  const [addPayment, setAddPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleAddPayment = (cardNumber) => {
    setPaymentDetails(cardNumber);
    setAddPayment(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-custom-black">Payment</h1>
      <div className="border-b border-payment-gray py-1 w-3/4 mb-6"></div>

      {addPayment ? (
        <div>
          <AddPaymentDetails onAddPayment={handleAddPayment} />
        </div>
      ) : (
        <>
          <p className="text-md text-payment-gray">
            Add a payment method using our secure
          </p>
          <p className="text-md text-payment-gray">
            payment system, then planning your next trip.
          </p>
          <div className="pt-10">
            {paymentDetails && (
              <SavedPaymentMethod
                cardNumber={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            )}
            <PaymentButton
              text={
                paymentDetails
                  ? "Add Another Payment Method"
                  : "Add Payment Method"
              }
              setAddPayment={setAddPayment}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
