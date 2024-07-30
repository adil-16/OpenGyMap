import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUid = localStorage.getItem("uid");

    if (storedIsLoggedIn && storedUid) {
      setIsLoggedIn(true);
      setUid(storedUid);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (uid) => {
    setIsLoggedIn(true);
    setUid(uid);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("uid", uid);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUid("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fcmToken");
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
