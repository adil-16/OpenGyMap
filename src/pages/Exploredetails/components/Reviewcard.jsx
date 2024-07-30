import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";

const Reviewcard = ({
  timestamp,
  userLocation,
  userImageUrl,
  userName,
  description,
  rating,
}) => {
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < rating);

  return (
    <div className="border rounded-xl p-4 border-custom-gray max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <div className="flex">
          {stars.map((filled, index) => (
            <MdOutlineStarPurple500
              key={index}
              className={`h-6 w-6 ${filled ? "text-black" : "text-gray-300"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 sm:mt-0 mt-2">
          <span className="text-xl mb-3">.</span>
          <p className="text-lg font-semibold font-inter">{timestamp}</p>
        </div>
      </div>

      <div className="flex flex-wrap text-custom-gray mt-2 sm:mt-4">
        {description}
      </div>

      <div className="py-1 flex items-center space-x-1 mt-2 sm:mt-4">
        <button className="underline text-xl font-inter font-semibold">
          show more
        </button>
        <IoChevronForward className="h-4 w-4 mt-1" />
      </div>

      <div className="flex space-x-6 py-4 items-center mt-2 sm:mt-4">
        <img src={userImageUrl} className="h-8 w-8 rounded-full" alt="this" />

        <div className="font-inter font-semibold text-base">
          <p className="text-custom-black">{userName}</p>
          <p className="text-custom-gray"> {userLocation}</p>
        </div>
      </div>
    </div>
  );
};

export default Reviewcard;
