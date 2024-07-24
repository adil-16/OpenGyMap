

import React from "react";

const DaySign = ({
  text = "S",
  bgColor = "bg-blue-500",
  borderColor = "border-blue-500",
  textColor = "text-custom-black",
  selected,
  onClick,
}) => {
  const selectedBgColor = "bg-custom-gradient";
  const selectedTextColor = "text-white";

  return (
    <div
      className={` cursor-pointer flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
        selected ? selectedBgColor : bgColor
      } ${borderColor} border`}
      onClick={onClick}
    >
      <span
        className={`${
          selected ? selectedTextColor : textColor
        } font-medium text-sm sm:text-xl`}
      >
        {text}
      </span>
    </div>
  );
};

export default DaySign;
