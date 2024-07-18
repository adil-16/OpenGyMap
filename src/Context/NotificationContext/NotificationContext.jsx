import React, { createContext, useState, useContext } from "react";
import initialNotifications from "../../utils/Notificariondata/Notificationdata";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [readState, setReadState] = useState(false);

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
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
        removeNotification,
        clearNotifications,
        readState,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
