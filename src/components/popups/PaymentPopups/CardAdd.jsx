import React from "react";
import { TbMathGreater } from "react-icons/tb";
import Crossicon from "../../buttons/Crossicon";

const CardPopup = ({ onClose, onAddAnotherCard }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-custom-black">
            Payment Method
          </h2>
          <Crossicon onClick={onClose} />
        </div>
        <div className="border-b border-navbar-gray mb-4"></div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-popup-gray">
            Linked Cards
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  src="/Payment/mastercard.png"
                  alt="Card 1"
                  className="w-12 h-8"
                />
                <p className="font-semibold pl-6 text-custom-black text-lg">
                  4260 **** **** ****
                </p>
              </div>
              <TbMathGreater className="h-5 w-5 text-custom-black" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg">
              <div className="flex items-center">
                <img
                  src="/Payment/mastercard.png"
                  alt="Card 2"
                  className="w-12 h-8"
                />
                <p className="font-semibold pl-6 text-custom-black text-lg">
                  5678 **** **** ****{" "}
                </p>
              </div>
              <TbMathGreater className="h-5 w-5 text-custom-black" />
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={onAddAnotherCard}
            className="border border-custom-black text-custom-black py-2 px-16 rounded-lg"
          >
            Add Another
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPopup;
