import React from "react";
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = ({ notifications }) => {
   const navigate = useNavigate(); 

  const handleNotificationClick = (notif) => {
    // Placeholder function for navigation
     navigate(`/notifications`); // Example route, adjust as needed
    console.log(
      `Redirecting to notification detail for workArea ID: ${notif.workArea_id}`
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "40px",
        right: "10px",
        border: "1px solid #ccc",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
        padding: "15px",
        borderRadius: "8px",
        width: "300px",
        zIndex: "1001",
        overflow: "hidden",
      }}
    >
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <div
            key={index}
            onClick={() => handleNotificationClick(notif)}
            style={{
              margin: "10px 0",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "white")
            }
          >
            <strong>{notif.worker_name}</strong> requests to join{" "}
            <strong>{notif.workArea_name}</strong>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          No new notifications.
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
