// IconsComponent.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import workAreaHooks from "../hooks/workAreaHooks";

const IconsComponent = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { getAllWorkAreaJoinRequests } = workAreaHooks();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllWorkAreaJoinRequests();
        if (data && Array.isArray(data)) {
          // Assuming the data returned is an array of pending requests
          setNotificationCount(data.length); // Set the count to the number of pending requests
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ position: "fixed", top: "20px", right: "36px", zIndex: "1000" }}>
      <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px", marginRight: "20px" }} />
      <FontAwesomeIcon icon={faBell} style={{ fontSize: "24px" }} />
      {notificationCount > 0 && (
        <span style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          background: "red",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "12px"
        }}>
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default IconsComponent;
