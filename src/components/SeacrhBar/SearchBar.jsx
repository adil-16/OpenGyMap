import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="relative">
      <CiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-custom-black font-bold text-4xl" />
      <input
        placeholder="Search by game, venue, location"
        type="text"
        className="w-full p-6 pl-24 border border-gray-300 rounded-full shadow-xl bg-gray-50 text-custom-black dark:bg-white"
      />
    </div>
  );
};

export default SearchBar;
