import React from "react";
import logo from "../assets/img/logo.png";
import { useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLoginAuth } from "./AuthLogin";
// import loginAuth from "../";

const Nav = ({ children }) => {
  const styleActive =
    "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  const styleInactive =
    "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const LoginAuth = useLoginAuth();
  const isLogin = LoginAuth.isLogin;
  const isCompany = LoginAuth.isCompany;
  console.log("is login? isCompany?", isLogin, isCompany);

  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* <!-- Logo --> */}
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                React Jobs
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? styleActive : styleInactive
                  }
                >
                  Home
                </NavLink>

                {isCompany ? (
                  <NavLink
                    to='/add-job'
                    className={({ isActive }) =>
                      isActive ? styleActive : styleInactive
                    }
                    hidden={!isLogin}
                  >
                    Add Job
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to='/job-list'
                      className={({ isActive }) =>
                        isActive ? styleActive : styleInactive
                      }
                    >
                      Jobs
                    </NavLink>
                  </>
                )}

                {!isCompany && isLogin && (
                  <NavLink
                    to='/my-apply'
                    className={({ isActive }) =>
                      isActive ? styleActive : styleInactive
                    }
                  >
                    My Apply
                  </NavLink>
                )}

                {isLogin ? (
                  <NavLink
                    to='/logout'
                    className={({ isActive }) =>
                      isActive ? styleActive : styleInactive
                    }
                  >
                    Log out
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to='/login'
                      className={({ isActive }) =>
                        isActive ? styleActive : styleInactive
                      }
                    >
                      Log in
                    </NavLink>

                    <NavLink
                      to='/register'
                      className={({ isActive }) =>
                        isActive ? styleActive : styleInactive
                      }
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </nav>
  );
};

export default Nav;
