// FacilitiesDataContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const FacilitiesDataContext = createContext();

export const FacilitiesDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacilities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "facilities"));
      const facilitiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const uid = localStorage.getItem("uid");

      const filteredFacilities = facilitiesList.filter(
        (facility) => facility.createdBy === uid
      );

      setData(filteredFacilities);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const addFacility = (newFacility) => {
    setData((prevData) => [
      ...prevData,
      { ...newFacility, id: prevData.length + 1 },
    ]);
  };

  return (
    <FacilitiesDataContext.Provider
      value={{ data, setData, addFacility, loading, fetchFacilities }}
    >
      {children}
    </FacilitiesDataContext.Provider>
  );
};

export const useFacilitiesData = () => useContext(FacilitiesDataContext);
