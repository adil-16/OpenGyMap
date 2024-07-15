import React from "react";

const Custombutton = ({ text, borderColor, bgColor, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`rounded-full px-6 py-2 border ${borderColor} ${bgColor} bg-opacity-20`}
      >
        {text}
      </button>
    </div>
  );
};

export default Custombutton;
