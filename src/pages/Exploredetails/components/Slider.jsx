import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

const Slider = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <div className="relative w-full   ">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {imageUrls.map((slide, index) => (
          <div
            key={index}
            className={`absolute block w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex items-center -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {imageUrls.map((_, index) => {
          let size;
          if (index === 0) {
            size = 6;
          } else if (index >= 1 && index <= 3) {
            size = 8;
          } else {
            size = 10;
          }

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-300"
              }`}
              aria-label={`Slide ${index + 1}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
            ></button>
          );
        })}
      </div>

      <button
        type="button"
        className={`absolute top-0 left-0 flex items-center justify-center h-full px-4 cursor-pointer`}
        onClick={handlePrev}
        disabled={imageUrls.length === 1}
      >
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white    ${
            imageUrls.length > 1 ? "hover:bg-gray-800/100 " : "cursor-default"
          } 
          
                    ${imageUrls.length > 1 ? "hover:text-white " : "text-black"}
`}
        >
          <FaArrowLeft
            className={`          ${
              imageUrls.length > 1 ? "hover:text-white " : "text-black"
            }
`}
            aria-hidden="true"
          />
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button
        type="button"
        disabled={imageUrls.length === 1}
        className={`absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer`}
        onClick={handleNext}
      >
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-white  ${
            imageUrls.length > 1 ? "hover:bg-gray-800/100 " : "cursor-default"
          }

          ${imageUrls.length > 1 ? "hover:text-white " : "text-black"}
          
          
          `}
        >
          <FaArrowRight
            className={`${
              imageUrls.length > 1 ? "hover:text-white " : "text-black"
            }`}
            aria-hidden="true"
          />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
