import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import {
  getUserNotifications,
  getUserRequestedNotifications,
} from "../../firebase/Functions/NotificationFunctions";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [requestedNotifications, setRequestedNotifications] = useState([]);
  const [readState, setReadState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const uid = localStorage.getItem("uid");
      if (uid) {
        try {
          setLoading(true);
          const fetchedNotifications = await getUserNotifications(uid);
          setNotifications(fetchedNotifications);

          const fetchedRequestedNotifications =
            await getUserRequestedNotifications(uid);
          setRequestedNotifications(fetchedRequestedNotifications);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchNotifications();
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    setRequestedNotifications([]);
    setReadState(true);
  };

  return (
    <div
      className={`shadow-2xl rounded-lg bg-white p-4 w-full max-auto max-w-lg ${
        notifications.length > 0 || requestedNotifications.length > 0
          ? "h-full"
          : "h-96"
      }`}
    >
      <div className="flex justify-between gap-4 sm:gap-16 md:gap-40 pr-4 sm:pr-8 md:pr-12 border-b border-b-custom-gray pb-2">
        <p className="font-inter text-lg sm:text-xl font-semibold">
          Notification
        </p>
        <div className="border border-request-button-notresponse text-request-button-notresponse bg-request-button-notresponse bg-opacity-20 rounded-full p-1 sm:p-2">
          {notifications.length + requestedNotifications.length} New
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-16 h-16 border-t-4 bg-white border-custom-black border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {notifications.length > 0 &&
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col bg-white md:flex-row py-2 md:py-4"
              >
                <div className="flex-1 py-1 sm:py-3">
                  <img
                    className="h-6 w-6 sm:h-8 my-3 sm:w-8"
                    src={notification.profileImage}
                    alt="Profile"
                  />
                </div>
                <div className="flex-[7] py-1 sm:py-2">
                  <p className="font-inter ml-2 font-semibold py-1 sm:py-2 text-lg sm:text-xl">
                    {notification.type}
                  </p>
                  <p className="text-sm sm:text-base">
                    {notification.type === "Join Session" ? (
                      <>
                        {notification.userName} {notification.action}{" "}
                        <span className="text-lg sm:text-xl font-inter font-semibold">
                          “{notification.courtName}”
                        </span>{" "}
                        at
                      </>
                    ) : (
                      <>
                        You booked at{" "}
                        <span className="text-lg sm:text-xl font-inter font-semibold">
                          “{notification.courtName}”
                        </span>{" "}
                        at
                      </>
                    )}
                  </p>
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
                  <p className="text-xs sm:text-sm w-20 my-5 text-custom-gray">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))}
          {requestedNotifications.length > 0 &&
            requestedNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex flex-col bg-white md:flex-row py-2 md:py-4"
              >
                <div className="flex-1 py-1 sm:py-3">
                  <img
                    className="h-6 w-6 sm:h-8 my-3 sm:w-8"
                    src={notification.profileImage}
                    alt="Court"
                  />
                </div>
                <div className="flex-[7] py-1 sm:py-2">
                  <p className="font-inter ml-2 font-semibold py-1 sm:py-2 text-lg sm:text-xl">
                    Join Session
                  </p>
                  <p className="pl-3 text-sm sm:text-base">
                    <img src={notification.requestedUserImage || ""} />
                    <span className="text-lg sm:text-xl font-inter font-semibold">
                      {notification.requestedUsername}
                    </span>{" "}
                    wants to join the session “{notification.courtName}” at
                  </p>
                  <div className="font-inter flex gap-2 sm:gap-3 text-sm sm:text-base font-semibold py-1 sm:py-2">
                    <FaClock className="h-4 w-4 sm:h-6 sm:w-6" />
                    <p>{notification.date}</p>
                  </div>
                  <div className="font-inter flex gap-2 sm:gap-3 text-sm sm:text-base font-semibold py-1 sm:py-2">
                    <FaClock className="h-4 w-4 sm:h-6 sm:w-6 text-custom-blue" />
                    <p>{notification.time}</p>
                  </div>
                  <div className="flex justify-center space-x-4 sm:space-x-6 mt-4">
                    <button className="border rounded-full bg-red-500 text-white py-1 px-4 sm:px-12">
                      Decline
                    </button>
                    <button className="border rounded-full bg-green-500 text-white py-1 px-4 sm:px-12">
                      Accept
                    </button>
                  </div>
                </div>
                <div className="flex-1 py-1 sm:py-2">
                  <p className="text-xs sm:text-sm w-20 my-5 text-custom-gray">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
      <div
        className={`flex justify-center items-end ${
          notifications.length > 0 || requestedNotifications.length > 0
            ? ""
            : "h-48"
        }`}
      >
        <div className="bg-custom-gray mb-2 w-[85%] text-center sm:py-3 rounded-lg text-white text-base font-bold">
          <button onClick={clearNotifications}>Read All Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
