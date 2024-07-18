import React from "react";

import { RxCross2 } from "react-icons/rx";


const Crossicon = ({ onClick }) => {
  return (
    <div className="bg-gray-white text-center rounded-md p-1 z-20 shadow-lg">
      <RxCross2
        className="text-black text-2xl h-6 w-6  cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

export default Crossicon;
