import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.config";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    const encryptedPassword = localStorage.getItem("encryptedPassword");

    if (storedUid && encryptedPassword) {
      setIsLoggedIn(true);
      setUid(storedUid);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (uid) => {
    setIsLoggedIn(true);
    setUid(uid);
    localStorage.setItem("uid", uid);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUid("");
    localStorage.removeItem("uid");
    localStorage.removeItem("encryptedPassword");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, email, setEmail, uid, setUid }}
    >
      {children}
    </AuthContext.Provider>
  );
};
