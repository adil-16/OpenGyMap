import React from "react";

const RequestOtpButton = ({ text, setAddPayment }) => {
  return (
    <button
      onClick={() => setAddPayment(true)}
      className="bg-custom-gradient mt-6 text-white py-4 px-4 rounded-full w-40 md:w-60 lg:w-64"
    >
      {text}
    </button>
  );
};

export default RequestOtpButton;
