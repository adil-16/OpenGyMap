import React from "react";

const DaySign = ({
  text = "S",
  bgColor = "bg-blue-500",
  borderColor = "border-blue-500",
  textColor = "text-custom-black",
}) => {
  return (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-full  ${bgColor} ${borderColor} border`}
    >
      <span className={`${textColor} font-medium text-xl`}>{text}</span>
    </div>
  );
};

export default DaySign;
