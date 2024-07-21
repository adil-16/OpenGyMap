import React from "react";

const DaySign = ({
  text = "S",
  bgColor = "bg-blue-500",
  borderColor = "border-blue-500",
  textColor = "text-custom-black",
}) => {
  return (
    <div
      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${bgColor} ${borderColor} border`}
    >
      <span className={`${textColor} font-medium text-sm sm:text-xl`}>
        {text}
      </span>
    </div>
  );
};

export default DaySign;
