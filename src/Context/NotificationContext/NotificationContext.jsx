import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [readState, setReadState] = useState(false);

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
        setNotifications,
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
