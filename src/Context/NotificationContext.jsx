import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import workAreaHooks from "../hooks/workAreaHooks";

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { getAllWorkAreaJoinRequests } = workAreaHooks();

  const fetchNotifications = useCallback(async () => {
    const data = await getAllWorkAreaJoinRequests();
    if (data && Array.isArray(data)) {
      setNotifications(data);
      setNotificationCount(data.length);
    }
  }, [getAllWorkAreaJoinRequests]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Helper functions to modify count
  const decrementNotificationCount = () => {
    setNotificationCount((prevCount) => Math.max(0, prevCount - 1));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationCount,
        fetchNotifications,
        decrementNotificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
