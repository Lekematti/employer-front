import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import workAreaHooks from "../hooks/workAreaHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import userHooks from "../hooks/userHooks";
// Ensure your CSS does not hide the map container or cause display issues
import "../CSS/WorkAreaMap.css"; // This should correctly set dimensions and display properties

function CenterView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

function WorkAreaMap() {
  const [workAreas, setWorkAreas] = useState([]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const { getWorkAreasByCompanyId } = workAreaHooks();
  const { getUsersAndLogsByWorkAreaId } = userHooks();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchWorkAreas = async () => {
      const data = await getWorkAreasByCompanyId(1); // Ensure you replace '1' with dynamic company ID if needed
      setWorkAreas(data);
    };

    fetchWorkAreas();
  }, []);

  const handleWorkAreaClick = async (workAreaId, latitude, longitude) => {
    setMapCenter([latitude, longitude]);
    if (userDetails[workAreaId]) {
      // If data is already loaded for this work area, just toggle visibility or do nothing
      setUserDetails((prev) => ({ ...prev, [workAreaId]: null }));
    } else {
      // Fetch data only if it's not already loaded
      const users = await getUsersAndLogsByWorkAreaId(workAreaId);
      setUserDetails((prev) => ({ ...prev, [workAreaId]: users }));
    }
  };

  function formatDuration(timeString) {
    if (!timeString) return "0h 0m"; // Fallback for empty or undefined time strings
    const parts = timeString.split(':'); // Split "HH:MM:SS" into parts
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return `${hours}h ${minutes}m`; // Return formatted string
}

  console.log(userDetails)
  return (
    <div className="work-area-container">
      <MapContainer
        center={mapCenter}
        zoom={20}
        style={{ height: "100vh", width: "calc(100% - 300px)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {workAreas.map((workArea) => (
          <React.Fragment key={workArea.id}>
            <Marker position={[workArea.latitude, workArea.longitude]}>
              <Popup>
                {workArea.name}
                <br />
                {workArea.description}
              </Popup>
            </Marker>
            <Circle
              center={[workArea.latitude, workArea.longitude]}
              radius={workArea.radius}
              color="blue"
              fillColor="blue"
              fillOpacity={0.2}
            />
          </React.Fragment>
        ))}
        <CenterView center={mapCenter} />
      </MapContainer>
      <div className="work-area-list">
        <div className="work-area-list-header">Work Areas</div>
        <ul>
          {workAreas.map((workArea) => (
            <li
              key={workArea.id}
              onClick={() =>
                handleWorkAreaClick(
                  workArea.id,
                  workArea.latitude,
                  workArea.longitude
                )
              }
            >
              <div className="name">{workArea.name}</div>
              <div className="description">{workArea.description}</div>
              <div className="user-info">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    color: workArea.active_users > 0 ? "green" : "grey",
                    fontSize: "10px",
                  }}
                />
                {workArea.active_users == null || workArea.total_users == null
                  ? " No users in workplace yet"
                  : ` Users: ${workArea.active_users}/${workArea.total_users}`}
              </div>
              {userDetails[workArea.id] && (
                <ul className="user-details">
                  {userDetails[workArea.id].map((user) => (
                    <li key={user.id}>
                      <img
                        src={`http://localhost:3000/uploads/${user.picture}`}
                        alt={user.name}
                      />
                      <span className="user-name">{user.name}</span>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            color: user.is_active ? "green" : "grey",
                            marginRight: "10px",
                          }}
                        >
                          &bull;
                        </span>
                        {user.isActive ? (
                          <span>{user.currentWorkAreaName}</span>
                        ) : (
                          <span>
                            {user.workLog
                              ? user.workLog.comment
                              : "Not currently working"}
                          </span>
                        )}
                        {user.workLog && (
                           <span className="time-box">{formatDuration(user.workLog.hours_worked)}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkAreaMap;
