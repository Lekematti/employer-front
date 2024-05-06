import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import workAreaHooks from "../hooks/workAreaHooks";
import userHooks from "../hooks/userHooks";
import { useNotificationContext } from "../Context/NotificationContext";

const NotificationsScreen = () => {
  const [requests, setRequests] = useState([]);
  const {
    getAllWorkAreaJoinRequests,
    approveWorkAreaJoinRequest,
    deleteWorkAreaJoinRequest,
  } = workAreaHooks();
  const { getUserById } = userHooks();
  const { notificationCount, decrementNotificationCount } =
    useNotificationContext(); // Correctly using the custom hook
  const [actionMessage, setActionMessage] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (actionMessage.visible) {
      const timer = setTimeout(() => {
        setActionMessage({ visible: false, message: "" });
      }, 5000); // Clears the notification after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  const fetchRequests = async () => {
    try {
      const notifications = await getAllWorkAreaJoinRequests();
      const usersDetailsPromises = notifications.map(async (notif) => {
        try {
          const userDetails = await getUserById(notif.worker_id);
          return { ...notif, ...userDetails[0] };
        } catch (error) {
          console.error("Failed to fetch user details", error);
          return { ...notif, picture: "../assets/avatar.png" };
        }
      });
      const detailedNotifications = await Promise.all(usersDetailsPromises);
      setRequests(detailedNotifications);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  const handleApprove = async (
    workerId,
    workAreaId,
    workerName,
    workAreaName
  ) => {
    try {
      const result = await approveWorkAreaJoinRequest(workerId, workAreaId);
      if (
        result &&
        result.message === "Work area join request approved successfully."
      ) {
        console.log("Approval success:", result.message);
        setActionMessage({
          visible: true,
          message: `Approved ${workerName} to join ${workAreaName}.`,
          color: "green", // Set color to green on approval
        });
        decrementNotificationCount();
        fetchRequests();
      } else {
        console.error("Failed to approve:", result.message);
      }
    } catch (error) {
      console.error("Error approving the request", error);
    }
  };

  const handleDeny = async (workerId, workAreaId, workerName, workAreaName) => {
    try {
      const result = await deleteWorkAreaJoinRequest(workerId, workAreaId);
      if (result && result.message === "Request deleted successfully.") {
        console.log("Deletion success:", result.message);
        setActionMessage({
          visible: true,
          message: `Denied ${workerName} from joining ${workAreaName}.`,
          color: "red", // Keep color red on deny
        });
        decrementNotificationCount();
        fetchRequests();
      } else {
        console.error("Failed to delete:", result.message);
      }
    } catch (error) {
      console.error("Error deleting the request", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {actionMessage.visible && (
        <div
          style={{
            backgroundColor:
              actionMessage.color === "green" ? "#d4edda" : "#f8d7da", // Conditional background color
            color: actionMessage.color === "green" ? "#155724" : "#721c24", // Conditional text color
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: `1px solid ${
              actionMessage.color === "green" ? "#c3e6cb" : "#f5c6cb"
            }`, // Conditional border color
            textAlign: "center",
          }}
        >
          {actionMessage.message}
        </div>
      )}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Workplace Requests
      </h2>
      <div style={{ maxWidth: "800px", margin: "auto" }}>
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                padding: "20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <img
                src={
                  request.picture
                    ? `http://localhost:3000/uploads/${request.picture}`
                    : "/path/to/default/image.jpg"
                }
                alt={request.worker_name || "Default Name"}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "15px",
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong>{request.worker_name || "Unknown"}</strong>
                <div>
                  {request.joined_at
                    ? new Date(request.joined_at).toLocaleString()
                    : "Unknown Date"}
                </div>
              </div>
              <div style={{ flexGrow: 2, textAlign: "center" }}>
                <strong>{request.workArea_name}</strong>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{
                    color: "green",
                    fontSize: "24px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() =>
                    handleApprove(
                      request.worker_id,
                      request.workArea_id,
                      request.worker_name,
                      request.workArea_name
                    )
                  }
                />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  style={{ color: "red", fontSize: "24px", cursor: "pointer" }}
                  onClick={() =>
                    handleDeny(
                      request.worker_id,
                      request.workArea_id,
                      request.worker_name,
                      request.workArea_name
                    )
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              border: "1px solid #ccc",
            }}
          >
            No requests to show.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;
