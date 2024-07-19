import React from "react";
import Navbar from "../../components/Navbar/Navbar";

import { Outlet } from "react-router-dom";
import SettingSidebar from "../../components/SettingSidebar/SettingSidebar";
import { RxArrowLeft } from "react-icons/rx";

const SettingLayout = () => {
  return (
    <div className="">
      <div>
        <Navbar />
      </div>

      {/* Profile and icon */}

      <div className="flex space-x-2 items-center p-6">
        <RxArrowLeft className="h-6 w-6" />
        <p className="text-custom-black  text-2xl font-inter font-semibold">
          My Profile
        </p>
      </div>

      <div className="flex ">
        <div className="flex-1 p-6">
          <SettingSidebar />
        </div>

        <div className="flex-[4] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
