import React, { useState, useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);
  const notificationButtonRef = useRef(null); // Ref for notification button

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const notificationRefContains = notificationRef.current?.contains(
        event.target
      );
      const notificationButtonRefContains =
        notificationButtonRef.current?.contains(event.target);

      console.log("HELLO", notificationButtonRefContains);

      if (!notificationRefContains && !notificationButtonRefContains) {
        setShowNotification(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleNotification = () => {
    if (showNotification) {
      console.log("fuck");
      setShowNotification(false);
    }
    console.log("hellow world");
    setShowNotification((prev) => !prev);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setShowNotification(false); // Reset notification state on link click
    setDropdownOpen(false);

    console.log("activeLink is", path);
  };

  return (
    <nav className="bg-navbar-gray border-gray-200 mt-4 ml-4 mr-4 border rounded-full">
      <div className="flex flex-wrap items-center justify-between p-2">
        <img
          src="/logo.png"
          className="hidden lg:block object-contain h-10 w-24 lg:flex-[0.7]  "
          alt="OpenGyMap Logo"
        />

        <div
          className="items-center justify-between hidden w-full lg:flex lg:justify-center lg:w-auto lg:order-1 lg:flex-[5]"
          id="navbar-user"
        >
          <ul className="flex font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/homepage"
                onClick={() => handleLinkClick("/homepage")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "/homepage"
                    ? "text-blue-800"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                }`}
                aria-current={activeLink === "/homepage" ? "page" : undefined}
              >
                Homepage
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                onClick={() => handleLinkClick("/explore")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "/explore"
                    ? "text-blue-800"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                }`}
                aria-current={activeLink === "/explore" ? "page" : undefined}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/requests"
                onClick={() => handleLinkClick("/requests")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "/requests"
                    ? "text-blue-800"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                }`}
                aria-current={activeLink === "/requests" ? "page" : undefined}
              >
                Requests
              </Link>
            </li>
            <li>
              <Link
                to="/privacypolicy"
                onClick={() => handleLinkClick("/privacypolicy")}
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  activeLink === "/privacypolicy"
                    ? "text-blue-800"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                }`}
                aria-current={
                  activeLink === "/privacypolicy" ? "page" : undefined
                }
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center w-full justify-end md:order-2 space-x-3 md:space-x-5 gap-1 mr-8 lg:flex-1">
          <div className="relative">
            <IoMdNotificationsOutline
              className="w-8 h-8 cursor-pointer"
              onClick={toggleNotification}
              ref={notificationButtonRef}
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-custom-blue rounded-full"></span>
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex text-sm rounded-full md:me-0"
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
                ref={dropdownRef} // Set ref here
                className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-white dark:divide-gray-600 z-20"
                id="user-dropdown"
              >
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/setting"
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
        <div
          ref={notificationRef} // Set ref here
          className="absolute right-10 top-24 z-50 bg-white h-[85%] overflow-auto hide-scrollbar"
        >
          <Notification />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
