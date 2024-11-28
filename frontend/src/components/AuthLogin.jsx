import { useState, useEffect, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const loginContext = createContext();

const AuthLogin = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const checkLogin = async () => {
    console.log("我再檢查喔!");
    try {
      let res = await fetch("/api/loginAuth", {
        method: "GET",
      });
      const data = await res.json(); // 獲取解析後的資料

      console.log("data ", data);
      setIsLogin(data.isLogin); // 更新狀態
      setIsCompany(data.isCompany);

      if (!isLogin && isProtectedRoute(location.pathname)) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  const company = () => {
    setIsCompany(true);
  };

  const notCompany = () => setIsLogin(false);

  const isProtectedRoute = (path) => {
    const protectedRoutes = ["/addjob", "/editjob"]; // 受保護頁面的路徑
    return protectedRoutes.includes(path);
  };

  useEffect(() => {
    checkLogin();
  }, [location.pathname]);

  return (
    <loginContext.Provider
      value={{
        isLogin,
        login,
        logout,
        checkLogin,
        company,
        notCompany,
        isCompany,
        setIsCompany,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

export default AuthLogin;

export const useLoginAuth = () => {
  return useContext(loginContext);
};
