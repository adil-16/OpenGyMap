import React from "react";

const StartingAndEndingInput = ({
  placeholder = "Starting time",
  borderColor = "border-gray-300",
  placeholderColor = "placeholder-gray-500",
  textColor = "text-black",
  fontSize = "text-base",
  fontFamily = "font-sans",
  spanBorderColor = "border-gray-300",
  bold = "font-semibold",
  onChange,
  value,
  isDisabled
}) => {
  return (
    <div className="flex flex-col items-start">
      <input
        // onChange={onChange}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        type="time"
        step="60"
        placeholder={placeholder}
        className={`w-full text-center py-2 border-b ${bold} ${borderColor} ${placeholderColor} ${textColor} ${fontSize} ${fontFamily} focus:outline-none`}
      />
      <div
        className={`mt-2 mr-32 border-b-2 ${spanBorderColor} ${textColor} ${fontSize} ${fontFamily}`}
      ></div>
    </div>
  );
};

export default StartingAndEndingInput;
