import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNotificationContext } from '../Context/NotificationContext'; // Adjust path as needed
import NotificationDropdown from "./NotificationDropdown";

const IconsComponent = () => {
  const { notifications, notificationCount, fetchNotifications } = useNotificationContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleUserIconClick = () => {
    console.log("User icon clicked");
  };

  return (
    <div style={{ position: "fixed", top: "20px", right: "36px", zIndex: "1000" }} ref={dropdownRef}>
      <FontAwesomeIcon
        icon={faUser}
        style={{ fontSize: "24px", marginRight: "20px", cursor: "pointer" }}
        onClick={handleUserIconClick}
      />
      <FontAwesomeIcon
        icon={faBell}
        style={{ fontSize: "24px", cursor: "pointer" }}
        onClick={toggleDropdown}
      />
      <span
        style={{
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
          fontSize: "12px",
          cursor: "pointer",
        }}
        onClick={toggleDropdown}
      >
        {notificationCount}
      </span>
      {showDropdown && (
        <NotificationDropdown notifications={notifications} />
      )}
    </div>
  );
};

export default IconsComponent;