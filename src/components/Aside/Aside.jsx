import React from "react";
import { Link } from "react-router-dom";
import Crossicon from "../buttons/Crossicon";
import {
  FaHome,
  FaShieldAlt,
  FaCompass,
  FaEnvelopeOpenText,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
const Aside = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center bg-white text-black h-screen p-6">
      <div className="absolute top-0 right-0 m-4">
        <Crossicon onClick={onClick} />
      </div>

      <div className="mb-8">
        <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
      </div>
      <nav className="flex flex-col space-y-6 w-full">
        <Link
          to="/homepage"
          className="flex items-center text-lg p-3 hover:bg-gray-100 rounded-lg w-full"
        >
          <FaHome className="mr-3" />
          Home
        </Link>
        <Link
          to="/privacypolicy"
          className="flex items-center text-lg p-3 hover:bg-gray-100 rounded-lg w-full"
        >
          <FaShieldAlt className="mr-3" />
          Privacy Policy
        </Link>
        <Link
          to="/explore"
          className="flex items-center text-lg p-3 hover:bg-gray-100 rounded-lg w-full"
        >
          <FaCompass className="mr-3" />
          Explore
        </Link>
        <Link
          to="/requests"
          className="flex items-center text-lg p-3 hover:bg-gray-100 rounded-lg w-full"
        >
          <FaEnvelopeOpenText className="mr-3" />
          Requests
        </Link>
        <Link
          to="#"
          className="flex items-center text-lg p-3 hover:bg-gray-100 rounded-lg w-full"
        >
          <FaCog className="mr-3" />
          Settings
        </Link>
        <Link
          to="/"
          className="flex items-center text-lg p-3 hover:bg-gray-100 rounded-lg w-full"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </Link>
      </nav>
    </div>
  );
};

export default Aside;
