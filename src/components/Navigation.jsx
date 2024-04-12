import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../screens/Login.jsx";
import Register from "../screens/Register.jsx";
import Home from "../screens/Home.jsx";
import ManageWorkHours from "../screens/workHours.jsx";
import { MainContext } from "../Context/MainContext.jsx";
import { useContext } from "react";
import WorkPlaces from "../screens/WorkPlaces.jsx";
import IconsComponent from "./IconsComponent.jsx";
import NotificationsScreen from "../screens/Notifications.jsx";
import Sidebar from "./Sidebar";
import "../CSS/Sidebar.css";

function Navigation() {
  const { isLogged } = useContext(MainContext);

  return (
    <div className="app-container">
      {" "}
      {/* New container for layout */}
      {isLogged && (
        <>
          <Sidebar />
          <div className="content-area">
            {" "}
            {/* New container for main content */}
            <IconsComponent />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/manage-work-places" element={<WorkPlaces />} />
              <Route path="/manage-work-hours" element={<ManageWorkHours />} />
              <Route path="/notifications" element={<NotificationsScreen />} />
              {/* More authenticated routes */}
            </Routes>
          </div>
        </>
      )}
      {!isLogged && (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default Navigation;
