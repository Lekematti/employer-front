import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../screens/Login.jsx";
import Register from "../screens/Register.jsx";
import Home from "../screens/Home.jsx";
import Profile from "../screens/Profile.jsx";
import ManageWorkHours from "../screens/workHours.jsx";
import { MainContext } from "../Context/MainContext.jsx";
import { useContext } from "react";
import WorkPlaces from "../screens/WorkPlaces.jsx";
import IconsComponent from "./IconsComponent.jsx";
import NotificationsScreen from "../screens/Notifications.jsx";
import Sidebar from "./Sidebar";
import "../CSS/Sidebar.css";
import EditProfile from "../screens/EditProfile.jsx";
import ManageUsers from "../screens/ManageUsers.jsx";

import ManageWorkAreas from "../screens/ManageWorkAreas.jsx";


function Navigation() {
  const { isLogged } = useContext(MainContext);

  return (
    <div className="app-container">
      
      {isLogged && (
        <>
          <Sidebar />
          <div className="content-area">
            
            <IconsComponent />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/manage-work-places" element={<WorkPlaces />} />
              <Route path="/manage-work-hours" element={<ManageWorkHours />} />
              <Route path="/notifications" element={<NotificationsScreen />} />
              <Route path="/edit" element={<ManageWorkAreas />} />
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
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/manageusers" element={<ManageUsers />} />

          <Route path="/edit" element={<ManageWorkAreas />} />

        </Routes>
      )}
    </div>
  );
}

export default Navigation;
