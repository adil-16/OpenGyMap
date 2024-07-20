import React, { useState } from "react";

const AddPaymentDetails = ({ onAddPayment }) => {
  const [cardNumber, setCardNumber] = useState("1524 1520 5426 2100");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPayment(cardNumber);
  };

  return (
    <div className="flex items-center">
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-custom-black">
          Add Card Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-custom-black p-3 font-semibold"
              htmlFor="cardHolder"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              className="w-full p-4 border rounded-full text-custom-black"
              defaultValue="Muhammad Shahzaib"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-custom-black p-3 font-semibold"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="w-full p-4 border rounded-full text-custom-black"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label
                className="block text-custom-black p-3 font-semibold"
                htmlFor="expiryDate"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="w-full p-4 border rounded-full text-custom-black"
                defaultValue="12/09"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-custom-black font-semibold p-3"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="w-full p-4 border rounded-full mb-2 text-custom-black"
                defaultValue="095"
              />
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="px-12 py-3 border rounded-full text-custom-black"
              onClick={() => onAddPayment(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-3 bg-custom-gradient text-white rounded-full"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentDetails;
