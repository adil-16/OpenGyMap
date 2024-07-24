import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Slider = ({ images, handleUpload, handleDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputKey, setInputKey] = useState(Date.now()); // State to force input re-render

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleFileChange = (event) => {
    handleUpload(event);
    setInputKey(Date.now());
    setCurrentIndex(images.length);
  };

  const handleImageDelete = (index) => {
    handleDelete(index);
    if (index === currentIndex && images.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative h-40 md:h-60 overflow-hidden rounded-lg bg-[url(/Home/games.png)] ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute block w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Upload Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <label className="cursor-pointer">
          <FaPlus className="text-custom-black text-3xl bg-white p-2 rounded-full" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            key={inputKey} // Add key to force re-render
          />
        </label>
      </div>

      {/* Delete Icon */}
      {images.length > 0 && (
        <div className="absolute bottom-0 flex items-center justify-center w-full">
          <button
            type="button"
            className="text-white text-2xl  p-2 "
            onClick={() => handleImageDelete(currentIndex)}
          >
            <RxCross2 />
          </button>
        </div>
      )}

      {/* Previous Button */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60">
          <FaArrowLeft className="text-black" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60">
          <FaArrowRight className="text-black" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;
