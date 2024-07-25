// FacilitiesDataContext.jsx
import React, { createContext, useState, useContext } from "react";

const FacilitiesDataContext = createContext();

export const FacilitiesDataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const addFacility = (newFacility) => {
    setData((prevData) => [
      ...prevData,
      { ...newFacility, id: prevData.length + 1 },
    ]);
  };

  return (
    <FacilitiesDataContext.Provider value={{ data, setData, addFacility }}>
      {children}
    </FacilitiesDataContext.Provider>
  );
};

export const useFacilitiesData = () => useContext(FacilitiesDataContext);
