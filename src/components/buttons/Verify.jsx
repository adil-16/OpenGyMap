import React from "react";

const RequestOtpButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-custom-gradient text-white py-4 px-4 rounded-full w-40 md:w-60 lg:w-64"
    >
      {text}
    </button>
  );
};

export default RequestOtpButton;
