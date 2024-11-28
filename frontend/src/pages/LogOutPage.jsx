import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAuth } from "../components/AuthLogin";
const LogOutPage = () => {
  const nav = useNavigate();
  const LoginAuth = useLoginAuth();

  const LogOut = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      LoginAuth.logout();
      LoginAuth.notCompany();
      nav("/");
    }
  };

  useEffect(() => {
    LogOut();
  }, []); // 空依賴陣列，確保僅在組件掛載時執行

  return <div></div>;
};

export default LogOutPage;
