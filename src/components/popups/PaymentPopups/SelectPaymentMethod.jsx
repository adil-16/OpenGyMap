import React, { useState } from "react";
import Crossicon from "../../buttons/Crossicon";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

const PaymentSummaryPopup = ({ onClose, cardDetails, onContinue }) => {
  const [selectedPayments, setSelectedPayments] = useState([
    { type: "paypal", cardNumber: "1422 **** **** ****", amount: "$15.00" },
    { type: "mastercard", cardNumber: "5075 **** **** ****", amount: "$15.00" },
  ]);

  const removePayment = (type) => {
    setSelectedPayments(
      selectedPayments.filter((payment) => payment.type !== type)
    );
  };

  const handleContinue = () => {
    onContinue(selectedPayments);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-custom-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-h-full overflow-hidden">
        <div className="overflow-y-auto scrollbar-hidden max-h-[90vh]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-custom-black">
              Split Amount
            </h2>
            <Crossicon onClick={onClose} />
          </div>
          <div className="border-b border-navbar-gray mb-4"></div>
          <div className="mb-4">
            <p className="text-lg text-payment-gray font-semibold">
              Choose the payment methods for splitting amounts
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            {selectedPayments.map((payment) => (
              <div key={payment.type} className="mb-4 flex items-center">
                <label className="custom-checkbox mr-4">
                  <input type="checkbox" id={payment.type} checked readOnly />
                  <span className="checkmark"></span>
                </label>
                <img
                  src={`/Payment/${payment.type}.png`}
                  alt={payment.type}
                  className="w-6 h-6 mr-2"
                />
                <p className="text-custom-black text-lg mr-auto ml-2">
                  {payment.cardNumber}
                </p>
                <input
                  type="text"
                  value={payment.amount}
                  className="border rounded-lg p-2 w-20 text-center mr-4"
                  readOnly
                />
                <Crossicon onClick={() => removePayment(payment.type)} />
              </div>
            ))}
            {["googlePay", "applePay"].map((paymentType) => (
              <div key={paymentType} className="mb-6 flex items-center mt-2">
                <label className="custom-checkbox mr-4">
                  <input type="checkbox" id={paymentType} />
                  <span className="checkmark"></span>
                </label>
                {paymentType === "googlePay" ? (
                  <FcGoogle className="w-6 h-6 mr-4" />
                ) : (
                  <BsApple className="w-6 h-6 mr-4" />
                )}
                <p className="text-custom-black font-semibold flex-1">
                  {paymentType === "googlePay" ? "Google Pay" : "Apple Pay"}
                </p>
              </div>
            ))}
            <div className="flex justify-center mt-12">
              <button
                type="button"
                onClick={handleContinue}
                className="bg-custom-gradient text-white py-3 px-16 rounded-xl"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryPopup;
