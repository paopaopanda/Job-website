import React from "react";

const RoleBasedPage = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem("userRole") || "guest"; // 獲取角色

  if (!allowedRoles.includes(userRole)) {
    return <h1>403 - 無權訪問</h1>; // 不允許訪問時顯示訊息
  }

  return children; // 符合條件時渲染內容
};

export default RoleBasedPage;
