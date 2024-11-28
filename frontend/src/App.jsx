import React from "react";
import HomePage from "./pages/HomePage";
import { RouterProvider, BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import ErrorPage from "./pages/ErrorPage";
import EditPage from "./pages/EditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LogOutPage from "./pages/LogOutPage";
import JobsListPage from "./pages/JobsListPage";
import JobDetail from "./pages/JobDetail";
import ApplyListPage from "./pages/ApplyListPage";
import MyApplyPage from "./pages/MyApplyPage";

import AuthLogin from "./components/AuthLogin";
import AddJobPage from "./pages/AddJobPage";

const App = () => {
  console.log("app check login ");

  // const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <AuthLogin>
        <Routes>
          <Route path='/' element={<LayoutComponent />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/logout' element={<LogOutPage />} />

            {/* company -> edit job */}
            {<Route path='/add-job' element={<AddJobPage />} />}
            {<Route path='/edit-job/:id' element={<EditPage />} />}
            {<Route path='/apply/:id' element={<ApplyListPage />} />}

            {/* 共同 */}
            {<Route path='/job-list' element={<JobsListPage />} />}
            {<Route path='/:id' element={<JobDetail />} />}

            {/* <Route path='/editjob/:id' element={<EditPage />}  */}

            {/* user */}
            {/* 瀏覽應徵工作 */}
            {<Route path='/my-apply' element={<MyApplyPage />} />}

            {/* <Route path='/job/:title' element={<JobDetail />} /> */}

            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthLogin>
    </BrowserRouter>
  );
};

export default App;
