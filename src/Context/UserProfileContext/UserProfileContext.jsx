
import React, { useContext, useState, createContext } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  // Changed Children to children
  const [userProfile, setUserProfile] = useState({
    profilePicture: null, // Fixed typo from profiePictue to profilePicture
  });

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
