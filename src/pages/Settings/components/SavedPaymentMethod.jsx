import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const SavedPaymentMethod = ({ cardNumber, setPaymentDetails }) => {
  const maskedCardNumber = `${cardNumber.slice(0, 4)} **** **** ****`;

  return (
    <div className="flex items-center w-1/2 justify-between my-4">
      <div className="flex items-center">
        <img
          src="/Payment/mastercard.png"
          alt="MasterCard"
          className="w-12 h-12"
        />
        <span className="ml-4 text-lg font-semibold">{maskedCardNumber}</span>
      </div>
      <button
        className="flex items-center text-red-500"
        onClick={() => setPaymentDetails(null)}
      >
        <FaTrashAlt className="mr-2" />
        Unlink
      </button>
    </div>
  );
};

export default SavedPaymentMethod;
