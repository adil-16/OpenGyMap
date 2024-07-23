// import React from "react";
// import Navbar from "../../components/Navbar/Navbar";

// import { Outlet } from "react-router-dom";
// import SettingSidebar from "../../components/SettingSidebar/SettingSidebar";
// import { useNavigate } from "react-router-dom";
// import { RxArrowLeft } from "react-icons/rx";

// const SettingLayout = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="">

//       <div
//         className="flex space-x-2 items-center p-6 cursor-pointer"
//         onClick={() => {
//           navigate("/homepage");
//         }}
//       >
//         <RxArrowLeft className="h-6 w-6" />
//         <p className="text-custom-black  text-2xl font-inter font-semibold">
//           My Profile
//         </p>
//       </div>

//       <div className="flex ">
//         <div className="flex-1 p-6">
//           <SettingSidebar />
//         </div>

//         <div className="flex-[4] p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingLayout;

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SettingSidebar from "../../components/SettingSidebar/SettingSidebar";
import { useNavigate } from "react-router-dom";
import { RxArrowLeft } from "react-icons/rx";

const SettingLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        className="flex space-x-2 items-center p-6 cursor-pointer"
        onClick={() => {
          navigate("/homepage");
        }}
      >
        <RxArrowLeft className="h-6 w-6" />
        <p className="text-custom-black text-2xl font-inter font-semibold">
          My Profile
        </p>
      </div>

      <div className="lg:flex lg:flex-row flex-col-reverse">
        <div className="lg:flex-1 p-6 overflow-x-auto">
          <SettingSidebar />
        </div>

        <div className="lg:flex-[4] px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
