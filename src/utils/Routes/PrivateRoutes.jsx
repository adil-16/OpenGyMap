import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const PrivateRoutes = ({ Component }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
