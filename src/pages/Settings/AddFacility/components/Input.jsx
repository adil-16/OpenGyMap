import React from "react";

const Input = ({
  placeholder = "Enter text",
  borderColor,
  placeholderColor = "placeholder-gray-500",
  textColor = "text-black",
  fontSize = "text-base",
  fontFamily = "font-inter",
  bold = "text-bold",
  type = "text",
  onChange,
  value,
}) => {
  return (
    <>
      <div>
        <input
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`w-full py-2  ${placeholderColor} ${bold}  ${textColor} ${fontSize} ${fontFamily} focus:outline-none`}
        />
        <div className={` mr-52 border-b ${borderColor}`}></div>
      </div>
    </>
  );
};

export default Input;
