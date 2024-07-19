import React from "react";
import { FaClock } from "react-icons/fa";
import notifications from "../../utils/Notificariondata/Notificationdata";
import { useNotification } from "../../Context/NotificationContext/NotificationContext";

const Notification = () => {
  const { notifications, clearNotifications, readState } = useNotification();

  return (
    <div className="rounded-2xl shadow-custom-light p-4 w-full max-auto max-w-lg ">
      <div className="flex justify-between gap-4 sm:gap-16 md:gap-40 pr-4 sm:pr-8 md:pr-12 border-b border-b-custom-gray pb-2">
        <p className="font-inter text-lg sm:text-xl font-semibold">
          Notification
        </p>
        <div className="border border-request-button-notresponse text-request-button-notresponse bg-request-button-notresponse bg-opacity-20 rounded-full p-1 sm:p-2">
          {notifications.length} New
        </div>
      </div>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex flex-col md:flex-row py-2 md:py-4"
        >
          <div className="flex-1 py-1 sm:py-3">
            <img
              className="h-6 w-6 sm:h-8 sm:w-8"
              src={notification.profileImage}
              alt="Profile"
            />
          </div>
          <div className="flex-[7] py-1 sm:py-2">
            <p className="font-inter font-semibold py-1 sm:py-2 text-lg sm:text-xl">
              {notification.type}
            </p>
            {notification.type === "Join Session" && (
              <p className="text-sm sm:text-base">
                {notification.userName} {notification.action}{" "}
                <span className="text-lg sm:text-xl font-inter font-semibold">
                  “{notification.courtName}”
                </span>{" "}
                at
              </p>
            )}
            {notification.type !== "Join Session" && (
              <p className="text-sm sm:text-base">
                You booked at{" "}
                <span className="text-lg sm:text-xl font-inter font-semibold">
                  “{notification.courtName}”
                </span>{" "}
                at
              </p>
            )}
            <div className="font-inter flex gap-2 sm:gap-3 text-sm sm:text-base font-semibold py-1 sm:py-2">
              <FaClock className="h-4 w-4 sm:h-6 sm:w-6" />
              <p>{notification.date}</p>
            </div>
            <div className="font-inter flex gap-2 sm:gap-3 text-sm sm:text-base font-semibold py-1 sm:py-2">
              <FaClock className="h-4 w-4 sm:h-6 sm:w-6 text-custom-blue" />
              <p>{notification.time}</p>
            </div>
            <p className="text-sm sm:text-base font-inter py-3 sm:py-6">
              {notification.message}
            </p>
            {notification.actions && (
              <div className="flex justify-center space-x-4 sm:space-x-6">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    className={`border rounded-full bg-opacity-20 py-1 px-4 sm:px-12 ${action.style}`}
                  >
                    {action.type}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 py-1 sm:py-2">
            <p className="text-xs sm:text-sm text-custom-gray">
              {notification.timeAgo}
            </p>
          </div>
        </div>
      ))}

      {readState && (
        <div className="flex justify-center p-12">
          {" "}
          <p className="text-bold text-black ">No new Notifications</p>{" "}
        </div>
      )}

      <div className="flex justify-center">
        <div className="bg-custom-gray py-2 w-[85%] text-center  sm:py-3 rounded-lg  text-white text-base font-bold">
          <button onClick={clearNotifications} className="align-top">
            Read All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
