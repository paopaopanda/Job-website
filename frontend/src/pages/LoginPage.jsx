import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAuth } from "../components/AuthLogin";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const loginAuth = useLoginAuth();

  const loginHandler = async (e) => {
    console.log("in");
    e.preventDefault();

    const user = {
      account: account,
      password: password,
    };

    try {
      let res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await res.json();
      console.log("rrreees", data);

      if (res.ok) {
        loginAuth.login();
        if (data) {
          console.log("i am company");
          loginAuth.company();
        }
        nav("/");
      }
      console.log("login response: ", data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <section className='bg-indigo-50 h-lvh'>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={loginHandler}>
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Log In
              </h2>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Account
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='enter account'
                  required
                  onChange={(e) => setAccount(e.target.value)}
                  value={account}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Password
                </label>
                <input
                  type='text'
                  id='location'
                  name='location'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='Enter password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <div>
                <button
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
