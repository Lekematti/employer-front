import React, { createContext, useContext, useState, useEffect } from 'react';
import workAreaHooks from '../hooks/workAreaHooks';

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { getAllWorkAreaJoinRequests } = workAreaHooks();

  const fetchNotifications = async () => {
    // Simulate fetching data
    const data = await getAllWorkAreaJoinRequests(); // Your actual fetching logic
    if (data && Array.isArray(data)) {
      setNotifications(data);
      setNotificationCount(data.length);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, notificationCount, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
