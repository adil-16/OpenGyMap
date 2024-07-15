import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <nav className="bg-navbar-gray border-gray-200 mt-4 ml-4 mr-4 border rounded-full">
      <div className="flex flex-wrap items-center justify-between p-2">
        <img src="/logo.png" className="ml-8 h-16 w-20" alt="OpenGyMap Logo" />

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-white bg-blue-800 rounded md:bg-transparent md:text-blue-800 md:p-0"
                aria-current="page"
              >
                Homepage
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-nav-gray md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/requests"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-nav-gray md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Requests
              </Link>
            </li>
            <li>
              <Link
                to="/privacypolicy"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-nav-gray md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-5 gap-1 mr-8">
          <div className="relative">
            <IoMdNotificationsOutline
              className="w-8 h-8 cursor-pointer"
              onClick={toggleNotification}
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-custom-blue rounded-full"></span>
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex text-sm rounded-full md:me-0 "
              id="user-menu-button"
              aria-expanded={dropdownOpen}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-12 h-12 rounded-full"
                src="/Home/profile.png"
                alt="user photo"
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-white dark:divide-gray-600"
                id="user-dropdown"
              >
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-custom-black dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-custom-black dark:hover:text-white"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {showNotification && (
        <div className=" absolute right-16 top-20 z-50 bg-white h-[85%] overflow-auto ">
          <Notification />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
