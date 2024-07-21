import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import DeleteAccountModal from "../popups/SettingsPopups/DeleteAccount";

const SettingSidebar = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className=" ">
      <div className="flex flex-col space-y-4 font-inter text-base font-medium text-custom-black">
        {[
          {
            name: "Personal Information",
            path: "/setting",
          },
          { name: "My Facility", path: "/settings/myfacility" },
          { name: "My Bookings", path: "/settings/mybookings" },
          { name: "Payment", path: "/settings/payment" },
          { name: "Address", path: "/settings/address" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${
              activeLink === item.path
                ? "bg-custom-gradient rounded-lg text-white"
                : ""
            } p-3`}
            onClick={() => handleLinkClick(item.path)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="border-b border-nav-gray py-6"></div>

      <div className="py-6 space-y-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <p className="text-request-icon font-inter text-base font-medium">
            Delete Account
          </p>
          <IoIosArrowForward className="text-request-icon w-5 h-5" />
        </div>

        <div className="flex justify-between items-center pt-4">
          <p className="text-custom-black font-inter text-base font-medium">
            Logout
          </p>
          <IoIosArrowForward className="text-custom-black w-5 h-5 " />
        </div>
      </div>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default SettingSidebar;
