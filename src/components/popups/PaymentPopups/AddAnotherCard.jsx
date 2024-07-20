import React, { useState } from "react";
import Crossicon from "../../buttons/Crossicon";

const AddAnotherCardPopup = ({ onClose, onAddCard }) => {
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCard({ cardNumber });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-custom-black">Add New Card</h2>
          <Crossicon onClick={onClose} />
        </div>
        <div className="border-b border-navbar-gray mb-4"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="text-md mb-2 text-popup-gray block"
            >
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="border rounded-lg p-2 w-full pr-12"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <img
                src="/Payment/visaCard.png"
                alt="Visa Card"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-auto"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="cardName"
                className="text-md mb-2 text-popup-gray block"
              >
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter name on card"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="expiryDate"
                className="text-md mb-2 text-popup-gray block"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className="border rounded-lg p-2 w-full"
                placeholder="MM/YYYY"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="cvv"
                className="text-md mb-2 text-popup-gray block"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className="border rounded-lg p-2 w-full"
                placeholder="Enter CVV"
              />
            </div>
          </div>
          <div className="mb-8 mt-10">
            <div className="flex items-center">
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-gradient"></div>
                <span className="ml-3 font-semibold text-nav-gray">
                  Save Card for Future Billing?
                </span>
              </label>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="border border-custom-black text-custom-black py-2 px-16 rounded-lg"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnotherCardPopup;
