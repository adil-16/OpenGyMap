import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const SettingSidebar = () => {
  const [activeLink, setActiveLink] = useState("Personal Information");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className=" ">
      <div className="flex flex-col space-y-4 font-inter text-base font-medium text-custom-black">
        {[
          "Personal Information",
          "My Facility",
          "My Bookings",
          "Payment",
          "Address",
        ].map((link, index) => (
          <Link
            key={index}
            to="#"
            className={`${
              activeLink === link
                ? "bg-custom-gradient rounded-lg text-white"
                : ""
            } p-3`}
            onClick={() => handleLinkClick(link)}
          >
            {link}
          </Link>
        ))}
      </div>

      <div className="border-b border-nav-gray py-6"></div>

      <div className="py-6 space-y-3">
        <div className="flex justify-between items-center ">
          <p className="text-request-icon font-inter text-base font-medium">
            Delete Account
          </p>
          <IoIosArrowForward className="text-request-icon w-5 h-5 " />
        </div>

        <div className="flex justify-between items-center ">
          <p className="text-custom-black font-inter text-base font-medium">
            Logout
          </p>
          <IoIosArrowForward className="text-custom-black w-5 h-5 " />
        </div>
      </div>
    </div>
  );
};

export default SettingSidebar;
