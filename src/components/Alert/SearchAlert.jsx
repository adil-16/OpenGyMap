import React from "react";

const SearchAlert = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col justify-center items-center">
        <img src="/Alert/AlertSuccess.png" className="h-40 w-40" />

        <p className="font-inter font-bold text-xl sm:text-2xl md:text-3xl text-center">
          Search <span className="text-custom-blue">not found</span>
        </p>

        <p className="text-custom-gray font-inter font-medium py-4 text-sm sm:text-base md:text-lg text-center">
          Sorry, we couldn’t find any relevant court!
        </p>
      </div>
    </div>
  );
};

export default SearchAlert;
