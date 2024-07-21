import React from "react";

const Button = ({ text, bgColor, textColor, onClick }) => {
  return (
    <div className="rounded-lg  text-center">
      <button
        onClick={onClick}
        className={` ${textColor} ${bgColor} border  px-20 py-2 rounded-lg`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
