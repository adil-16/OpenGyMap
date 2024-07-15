import React from "react";
import { FaClock } from "react-icons/fa";
import notifications from "../../utils/Dummydata/Notificationdata";
const Notification = () => {
  return (
    <div className="rounded-lg shadow-custom-light p-4">
      <div className="flex justify-between gap-64 pr-12 border-b border-b-custom-gray pb-2">
        <p className="font-inter text-xl font-semibold">Notification</p>
        <div className="border border-request-button-notresponse text-request-button-notresponse bg-request-button-notresponse bg-opacity-20 rounded-full p-2">
          6 New
        </div>
      </div>

      {notifications.map((notification) => (
        <div key={notification.id} className="flex ">
          <div className="flex-1 py-3">
            <img
              className="h-8 w-8"
              src={notification.profileImage}
              alt="Profile"
            />
          </div>
          <div className="flex-[7] py-2">
            <p className="font-inter font-semibold py-2 text-xl">
              {notification.type}
            </p>
            {notification.type === "Join Session" && (
              <p>
                {notification.userName} {notification.action}{" "}
                <span className="text-xl font-inter font-semibold">
                  “{notification.courtName}”
                </span>{" "}
                at
              </p>
            )}
            {notification.type !== "Join Session" && (
              <p>
                You booked at{" "}
                <span className="text-xl font-inter font-semibold">
                  “{notification.courtName}”
                </span>{" "}
                at
              </p>
            )}
            <div className="font-inter flex gap-3 text-base font-semibold py-2">
              <FaClock className="h-6 w-6" />
              <p>{notification.date}</p>
            </div>
            <div className="font-inter flex gap-3 text-base font-semibold py-2">
              <FaClock className="h-6 w-6 text-custom-blue" />
              <p>{notification.time}</p>
            </div>
            <p className="text-base font-inter py-6">{notification.message}</p>
            {notification.actions && (
              <div className="flex justify-center space-x-6">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    className={`border rounded-full bg-opacity-20 py-1 px-12 ${action.style}`}
                  >
                    {action.type}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-end py-2">
            <p className="text-sm text-custom-gray">{notification.timeAgo}</p>
          </div>
        </div>
      ))}

      <div className="bg-custom-gray py-2 p-3 rounded-lg text-center text-white text-base font-bold">
        <button>Read All Notifications</button>
      </div>
    </div>
  );
};

export default Notification;
