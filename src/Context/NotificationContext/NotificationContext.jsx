import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    // {
    //   id: 1,
    //   type: "Join Session",
    //   profileImage: "/Request/profileimage.png",
    //   userName: "Jessica Kawai",
    //   courtName: "Basketball Court",
    //   date: "12 Jan 2022",
    //   time: "12:00 - 14:00",
    //   action: "wants to join the session",
    //   timeAgo: "2hr ago",
    //   actions: [
    //     {
    //       type: "Decline",
    //       style:
    //         "border-request-button-decline text-request-button-decline bg-request-button-decline",
    //     },
    //     {
    //       type: "Accept",
    //       style:
    //         "border-request-button-accepted text-request-button-accepted bg-request-button-accepted",
    //     },
    //   ],
    // },
  ]);
  const [readState, setReadState] = useState(false);

  // const addNotification = (notification) => {
  //   console.log("Adding Notification:", notification);
  //   setNotifications((prevNotifications) => [
  //     ...prevNotifications,
  //     notification,
  //   ]);
  // };
  const addNotification = (newNotifications) => {
    // Ensure newNotifications is an array
    if (!Array.isArray(newNotifications)) {
      console.error("Expected newNotifications to be an array");
      return;
    }

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...newNotifications,
    ]);
  };

  const removeNotification = (notificationId) => {
    console.log("notification is", notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => {
        notification.id !== notificationId;
      })
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
    setReadState(true);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        readState,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
