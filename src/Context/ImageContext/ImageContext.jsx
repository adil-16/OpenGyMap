// import React, { createContext, useContext, useState } from "react";

// // Create a context for managing images
// const ImageContext = createContext();

// export const useImages = () => {
//   return useContext(ImageContext);
// };

// export const ImageProvider = ({ children }) => {
//   const [images, setImages] = useState([
//     "/Home/games.png",
//     "/Home/games.png",
//     "/docs/images/carousel/carousel-3.svg",
//     "/docs/images/carousel/carousel-4.svg",
//     "/docs/images/carousel/carousel-5.svg",
//   ]);

//   const addImage = (url) => {
//     setImages((prevImages) => [...prevImages, url]);
//   };

//   return (
//     <ImageContext.Provider value={{ images, addImage }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState(["/Home/games.png"]);

  const addImage = (url) => {
    setImages((prevImages) => [...prevImages, url]);
  };

  const removeImage = (url) => {
    setImages((prevImages) => prevImages.filter((image) => image !== url));
  };

  const clearImages = () => {
    setImages([]);
  };

  return (
    <ImageContext.Provider
      value={{ images, addImage, removeImage, clearImages }}
    >
      {children}
    </ImageContext.Provider>
  );
};
