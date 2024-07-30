import React, { useState } from "react";

const StarRating = ({ rating, handleRating, value, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`text-5xl  ${
                index <= rating
                  ? "text-custom-gradient"
                  : "text-white star-border"
              }
              `}
              onClick={() => handleRating(index)}
            >
              &#9733;
            </button>
          );
        })}
      </div>
      <p className="mt-2 font-inter font-semibold  text-3xl text-custom-gradient">
        {rating}
        <span className="font-inter font-semibold  text-3xl">.0</span>
      </p>

      <div className="w-full p-4 h-40 ">
        <textarea
          className="w-full border border-nav-gray p-3 rounded-2xl h-full "
          onChange={onChange}
          value={value}
          placeholder="Your Message..."
        ></textarea>
      </div>
    </div>
  );
};

export default StarRating;
