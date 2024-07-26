import React, { useState } from "react";

const Slider = ({ imageUrls = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative  w-full">
      <div
        className="relative overflow-x-scroll  scrollbar-hide snap-x snap-mandatory"
        onScroll={handleScroll}
      >
        <div className="flex ">
          {imageUrls.map((slide, index) => (
            <div
              key={index}
              id={`slide-${index}`}
              className="w-full flex-shrink-0 snap-center h-44 md:h-56 lg:h-72"
            >
              <img
                src={slide}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default Slider;
