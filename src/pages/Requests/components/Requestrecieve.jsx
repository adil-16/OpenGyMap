import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Custombutton from "./Custombutton";

import { useNotification } from "../../../Context/NotificationContext/NotificationContext";
import { timeAgo } from "../../../utils/TimeAgo/timeAgo";

const Requestrecieve = () => {
  const { notifications } = useNotification();

  return (
    <div className=" py-4 space-y-3 px-1 ">
      {notifications.map((notification) => (
        <div key={notification.id}>
          <div className="  flex justify-between">
            <p className="font-poppins text-2xl font-semibold ">
              {notification.courtName}
            </p>
            <p className="text-custom-gray">
              {timeAgo(notification.createdAt)}
            </p>
          </div>

          <div className="font-poppins text-base py-2">
            <p>
              {notification.time} ({notification.hours} hours)
            </p>
          </div>

          <div className="flex   justify-between items-center ">
            <div className="flex space-x-2 ">
              <FaLocationDot className="text-request-icon border-b-4 flex border-request-icon h-5 w-5" />

              <p className="font-inter text-custom-gray text-base">
                {notification.location}
              </p>
            </div>

            <button className="rounded-full px-6 py-2 font-inter font-semibold border-custom-gray border">
              View
            </button>
          </div>

          <div className=" text-custom-gray font-inter font-medium py-2">
            Requested by
          </div>
          <div className="flex space-x-2 py-2">
            <img
              src="/Request/profileimage.png"
              className="h-6 w-6 rounded-full "
            />
            <p className="font-inter font-semibold text-xl">Johnsan Staton</p>
          </div>

          <div className="flex gap-3 justify-center items-center py-2">
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
      ))}
    </div>
  );
};

export default Requestrecieve;
