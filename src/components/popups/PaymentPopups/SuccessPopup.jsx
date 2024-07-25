import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/homepage");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8">
      <div className="bg-white p-4 sm:p-8 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg text-center">
        <img
          src="/Payment/Success.png"
          alt="Success"
          className="mx-auto mb-4 sm:mb-6 w-24 sm:w-32 h-24 sm:h-32"
        />
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-custom-blue">
          Congratulations!
        </h2>
        <p className="mb-4 sm:mb-6 text-payment-gray font-bold">
          Your booking has been successful
        </p>
        <p
          className="font-semibold mb-4 sm:mb-6 underline text-custom-black cursor-pointer"
          onClick={onClose}
        >
          View Now
        </p>
        <button
          className="w-full sm:w-2/3 py-2 sm:py-3 bg-custom-gradient font-semibold text-white rounded-lg"
          onClick={navigateToHome}
        >
          Go to homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
