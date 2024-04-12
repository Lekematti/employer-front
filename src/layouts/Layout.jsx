import React from "react";
import Sidebar from "../components/Sidebar";
import IconsComponent from "../components/IconsComponent";

const Layout = ({ children }) => {
  return (
    <div>
      <IconsComponent />
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
