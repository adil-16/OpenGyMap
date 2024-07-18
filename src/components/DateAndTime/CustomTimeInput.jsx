// CustomTimeInput.js
import React from "react";

const CustomTimeInput = ({ selectedTime, onChange }) => {
  return (
    <div className="relative py-4    w-[80%] md:w-32 ">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-custom-blue dark:text-custom-blue"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="time"
        id="time"
        className="bg-navbar-gray border leading-none font-semibold text-custom-black text-sm rounded-lg block w-full p-2.5 dark:bg-navbar-gray dark:placeholder-custom-black"
        min="09:00"
        max="18:00"
        value={selectedTime}
        onChange={onChange}
        placeholder="Time"
        required
      />
    </div>
  );
};

export default CustomTimeInput;
