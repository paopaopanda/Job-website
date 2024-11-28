import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userType, setUserType] = useState(false);
  const nav = useNavigate();

  const onOptionChange = (e) => {
    setUserType(e.target.value);
  };

  const registerHandler = async (e) => {
    console.log("register in");
    e.preventDefault();

    const user = {
      displayName: displayName,
      account: account,
      password: password,
      is_company: userType,
    };

    try {
      let res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await res.json();
      if (res.ok) {
        nav("/");
      }

      console.log("register response: ", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className='bg-indigo-50 h-lvh'>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={registerHandler}>
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Register
              </h2>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  DisplayName
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='enter account'
                  required
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </div>

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
                <input
                  type='radio'
                  id='company'
                  value={true}
                  name='user-type'
                  onChange={onOptionChange}
                />
                <label htmlFor='type'>我是公司</label>
              </div>

              <div className='mb-2'>
                <input
                  type='radio'
                  id='user'
                  value={false}
                  name='user-type'
                  checked
                  onChange={onOptionChange}
                />
                <label htmlFor='typer'>我是求職者</label>
              </div>

              <div>
                <button
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
