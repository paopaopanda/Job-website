import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const LayoutComponent = (isLogin) => {
  return (
    <Nav isLogin={isLogin}>
      <Outlet />
    </Nav>
  );
};

export default LayoutComponent;
