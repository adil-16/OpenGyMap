import React from "react";

const Custombutton = ({ bgColor, text, onClick, textColor }) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} border border-custom-gray  py-4 px-4 rounded-full w-64"`}
    >
      {text}
    </button>
  );
};

export default Custombutton;
