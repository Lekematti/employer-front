// IconsComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import workAreaHooks from "../hooks/workAreaHooks";
import NotificationDropdown from "./NotificationDropdown";

const IconsComponent = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { getAllWorkAreaJoinRequests } = workAreaHooks();
  const dropdownRef = useRef(null); // Ref for the dropdown element

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllWorkAreaJoinRequests();
        if (data && Array.isArray(data)) {
          setNotificationCount(data.length); // Set the count to the number of pending requests
          setNotifications(data); // Set the notifications to the pending requests
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleUserIconClick = () => {
    console.log("User icon clicked"); // Placeholder for user icon click action
  };

  return (
    <div
      style={{ position: "fixed", top: "20px", right: "36px", zIndex: "1000" }}
      ref={dropdownRef}
    >
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
      {notificationCount > 0 && (
        <>
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
            onClick={toggleDropdown} // Allows clicking the badge to also toggle the dropdown
          >
            {notificationCount}
          </span>
          {showDropdown && (
            <NotificationDropdown notifications={notifications} />
          )}
        </>
      )}
    </div>
  );
};

export default IconsComponent;
