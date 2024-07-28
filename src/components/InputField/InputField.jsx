import React from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  iconSrc,
  isDisabled,
}) => {
  return (
    <div className="flex items-center border-b-2 border-gray-300 py-2 mb-6 lg:w-96 sm:w-64 md:w-80">
      {iconSrc && (
        <img src={iconSrc} alt={`${placeholder} Icon`} className="mr-6" />
      )}
      <input
        required
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={isDisabled}
        className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
      />
    </div>
  );
};

export default InputField;
