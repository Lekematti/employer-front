import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import workAreaHooks from "../hooks/workAreaHooks";
import userHooks from "../hooks/userHooks";

const NotificationsScreen = () => {
  const [requests, setRequests] = useState([]);
  const { getAllWorkAreaJoinRequests, approveWorkAreaJoinRequest } =
    workAreaHooks();
  const { getUserById } = userHooks();

  useEffect(() => {
    fetchRequests();
  }, []);

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

  const handleApprove = async (workerId, workAreaId) => {
    try {
      const result = await approveWorkAreaJoinRequest(workerId, workAreaId);
      if (result && result.message) {
        console.log("Response message:", result.message);
        if (
          result.message === "Work area join request approved successfully."
        ) {
          console.log("Approval success:", result.message);
          fetchRequests(); // Re-fetch or modify state to reflect changes
        } else {
          console.error("Failed to approve:", result.message);
        }
      } else {
        throw new Error("No valid response from server."); // Throw an error if the response is not as expected
      }
    } catch (error) {
      console.error("Error approving the request", error);
    }
  };
  const handleDeny = (workerId, workAreaId) => {
    console.log(`Deny: ${workerId} for ${workAreaId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Workplace Requests
      </h2>

      <div style={{ maxWidth: "800px", margin: "auto" }}>
        {" "}
        {/* Center and constrain card width */}
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
                backgroundColor: "white", // Individual card background
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
                    handleApprove(request.worker_id, request.workArea_id)
                  }
                />
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  style={{
                    color: "red",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleDeny(request.worker_id, request.workArea_id)
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
              backgroundColor: "white", // For consistency
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
