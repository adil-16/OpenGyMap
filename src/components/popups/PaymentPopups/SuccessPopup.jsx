import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/homepage");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 w-1/4 rounded-lg shadow-lg text-center">
        <img
          src="/Payment/Success.png"
          alt="Success"
          className="mx-auto mb-6 w-32 h-32"
        />
        <h2 className="text-2xl font-bold mb-4 text-custom-blue">
          Congratulations!
        </h2>
        <p className="mb-6 text-payment-gray font-bold">
          Your booking has been successful
        </p>
        <p
          className=" font-semibold mb-6 underline text-custom-black rounded-full cursor-pointer"
          onClick={onClose}
        >
          View Now
        </p>
        <button
          className="w-2/3 py-3 bg-custom-gradient font-semibold text-white rounded-lg"
          onClick={navigateToHome}
        >
          Go to homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
