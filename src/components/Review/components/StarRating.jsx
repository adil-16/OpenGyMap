import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

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

      <div className="w-full p-4 h-40 v">
        <input
          placeholder="Your message"
          className="w-full border border-nav-gray rounded-2xl h-full "
        />
      </div>
    </div>
  );
};

export default StarRating;
