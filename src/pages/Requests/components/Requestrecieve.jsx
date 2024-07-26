import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Custombutton from "./Custombutton";

import { useNotification } from "../../../Context/NotificationContext/NotificationContext";

const Requestrecieve = () => {
  // const { notification, setNotifications, readState } = useNotification(); 
  return (
    <div className=" py-4 space-y-3 ">
      <div className=" flex justify-between">
        <p className="font-poppins text-2xl font-semibold ">Basketball</p>
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

        <button className="rounded-full px-6 py-2 font-inter font-semibold border-custom-gray border">
          View
        </button>
      </div>

      <div className=" text-custom-gray font-inter font-medium">
        Requested by
      </div>
      <div className="flex space-x-2">
        <img
          src="/Request/profileimage.png"
          className="h-6 w-6 rounded-full "
        />
        <p className="font-inter font-semibold text-xl">Johnsan Staton</p>
      </div>

      <div className="flex gap-3 justify-center items-center">
        <Custombutton
          text="Decline"
          bgColor="bg-request-button-decline"
          onClick={() => {
            "Decline button is clicked";
          }}
          borderColor="border-request-button-decline"
        />

        <Custombutton
          text="Accept"
          bgColor="bg-request-button-accepted"
          onClick={() => {
            "Accepted button is clicked";
          }}
          borderColor="border-request-button-accepted"
        />
      </div>
    </div>
  );
};

export default Requestrecieve;
