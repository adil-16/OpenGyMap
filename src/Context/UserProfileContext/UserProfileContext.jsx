import React, { useContext, useState, createContext } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    profilePicture: null,
  });

  const setProfilePic = (profilePicture) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture,
    }));
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setProfilePic, setUserProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
