// import React, { createContext, useState, useContext } from "react";
// import initialNotifications from "../../utils/Notificariondata/Notificationdata";

// const NotificationContext = createContext();

// export const useNotification = () => useContext(NotificationContext);

// const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState(initialNotifications);
//   const [readState, setReadState] = useState(false);

//   const removeNotification = (id) => {
//     setNotifications((prev) =>
//       prev.filter((notification) => notification.id !== id)
//     );
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//     setReadState(true);
//   };

//   const addNotification = (notification) => {
//     setNotifications((prevNotifications) => [
//       ...prevNotifications,
//       notifications,
//     ]);
//   };

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         removeNotification,
//         clearNotifications,
//         addNotification,
//         readState,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export default NotificationProvider;

import React, { createContext, useContext, useState } from "react";

import notifications from "../../utils/Notificariondata/Notificationdata";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Join Session",
      profileImage: "/Request/profileimage.png",
      userName: "Jessica Kawai",
      courtName: "Basketball Court",
      date: "12 Jan 2022",
      time: "12:00 - 14:00",
      action: "wants to join the session",
      timeAgo: "2hr ago",
      actions: [
        {
          type: "Decline",
          style:
            "border-request-button-decline text-request-button-decline bg-request-button-decline",
        },
        {
          type: "Accept",
          style:
            "border-request-button-accepted text-request-button-accepted bg-request-button-accepted",
        },
      ],
    },
  ]);
  const [readState, setReadState] = useState(false);

  const addNotification = (notification) => {
    console.log("Adding Notification:", notification); 
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setReadState(true);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, clearNotifications, readState }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
