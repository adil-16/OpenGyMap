import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import DeleteAccountModal from "../popups/SettingsPopups/DeleteAccount";

const SettingSidebar = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="lg:flex lg:flex-col space-y-4 font-inter text-base font-medium text-custom-black">
      <div className="flex lg:flex-col flex-row overflow-x-auto lg:space-y-4 space-x-4 lg:space-x-0">
        {[
          {
            name: "Personal Information",
            path: "/setting",
          },
          { name: "My Facility", path: "/setting/myfacility" },
          { name: "My Bookings", path: "/setting/mybookings" },
          { name: "Payment", path: "/setting/payment" },
          { name: "Address", path: "/setting/address" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${
              activeLink === item.path
                ? "lg:bg-custom-gradient lg:rounded-lg lg:text-white lg:no-underline"
                : ""
            } 

            ${activeLink === item.path ? "underline " : ""} 
            
            
            p-3 whitespace-nowrap`}
            onClick={() => handleLinkClick(item.path)}
          >
            {item.name}
          </Link>
        ))}
        <div
          className="flex justify-between items-center cursor-pointer lg:hidden"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <p className="text-request-icon font-inter text-base font-medium p-3 whitespace-nowrap">
            Delete Account
          </p>
        </div>

        <div
          className="flex justify-between items-center cursor-pointer lg:hidden lg:py- py-0"
          onClick={() => {
            navigate("/");
          }}
        >
          <p className="text-custom-black font-inter text-base font-medium p-3 whitespace-nowrap">
            Logout
          </p>
        </div>
      </div>

      <div className="  lg:hidden py-6"></div>

      <div className="py-10 space-y-3 hidden lg:block">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <p className="text-request-icon font-inter text-base font-medium">
            Delete Account
          </p>
          <IoIosArrowForward className="text-request-icon w-5 h-5" />
        </div>

        <div
          className="flex justify-between items-center cursor-pointer py-3"
          onClick={() => {
            navigate("/");
          }}
        >
          <p className="text-custom-black font-inter text-base font-medium">
            Logout
          </p>
          <IoIosArrowForward className="text-custom-black w-5 h-5" />
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
