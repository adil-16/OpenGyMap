import React from "react";
import Crossicon from "../buttons/Crossicon";
import StarRating from "../popups/ReviewPopup/components/StarRating";

const ReviewPopup = () => {
  const handleClose = () => {
    console.log("handle cross icon is Click");
  };


  
  return (
    <div className=" bg-white shadow-lg w-[25%] h-auto  rounded-lg">
      <div className="flex justify-between p-4">
        <p className="font-inter font-semibold text-custom-black text-xl">
          Review
        </p>
        <Crossicon onClick={handleClose} />
      </div>
      <div className=" w-full   border-b border-nav-gray"></div>

      <div className="py-4 ">
        <StarRating  />
      </div>

      <div>
        <button>Cancel</button>
        <button>Add</button>
      </div>
    </div>
  );
};

export default ReviewPopup;
