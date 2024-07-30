import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const PublicRoutes = ({ Component }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? <Navigate to="/homepage" replace /> : <Component />;
};

export default PublicRoutes;
