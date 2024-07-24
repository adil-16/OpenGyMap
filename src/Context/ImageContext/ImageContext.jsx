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
