import React from "react";

import { FaLocationDot } from "react-icons/fa6";
import Custombutton from "./Custombutton";

const Requestcard = ({ check, text, borderColor, bgColor, onClick }) => {
  return (
    <div className=" py-4 space-y-3 border-b-2  border-custom-gray">
      <div className=" flex justify-between">
        <p className="font-poppins text-2xl font-semibold ">
          Basketball Gym Name
        </p>
        <p className="text-custom-gray">25 mins ago</p>
      </div>

      <div className="font-poppins text-base">
        <p>12:00 -04:00 (4 hours)</p>
      </div>

      <div className="flex   justify-between items-center ">
        <div className="flex space-x-2 ">
          <FaLocationDot className="text-request-icon border-b-4 flex border-request-icon h-5 w-5" />

          <p className="font-inter text-custom-gray text-base">
            Street 123, California, USA
          </p>
        </div>

        {check ? (
          <button className="rounded-full px-6 py-2 font-inter font-semibold border-custom-gray border">
            View
          </button>
        ) : (
          <Custombutton
            text={text}
            bgColor={bgColor}
            borderColor={borderColor}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default Requestcard;
