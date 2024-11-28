import React, { useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

const AddJobPage = () => {
  const params = useParams();
  const location = useLocation();
  const companyKey = location.state?.companyKey;
  const [type, setType] = useState("Full-Time");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("Under $50K");
  const [available, setAvailable] = useState("true");

  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newJob = {
      title: name,
      type,
      description,
      salary,
      available,
    };

    try {
      const res = await fetch("/api/company/add-job", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      const data = await res.json();

      console.log("res: ", data);

      if (res.ok) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='bg-indigo-50'>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitHandler}>
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Add Job
              </h2>

              <div className='mb-4'>
                <label
                  htmlFor='type'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Job Type
                </label>
                <select
                  id='type'
                  name='type'
                  className='border rounded w-full py-2 px-3'
                  required
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value='Full-Time'>Full-Time</option>
                  <option value='Part-Time'>Part-Time</option>
                  <option value='Remote'>Remote</option>
                  <option value='Internship'>Internship</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Job Name
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='eg. Beautiful Apartment In Miami'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  className='border rounded w-full py-2 px-3'
                  rows='4'
                  placeholder='Add any job duties, expectations, requirements, etc'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='type'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Salary
                </label>
                <select
                  id='salary'
                  name='salary'
                  className='border rounded w-full py-2 px-3'
                  onChange={(e) => setSalary(e.target.value)}
                  value={salary}
                  required
                >
                  <option value='Under $50K'>Under $50K</option>
                  <option value='$50K - 60K'>$50K - $60K</option>
                  <option value='$60K - 70K'>$60K - $70K</option>
                  <option value='$70K - 80K'>$70K - $80K</option>
                  <option value='$80K - 90K'>$80K - $90K</option>
                  <option value='$90K - 100K'>$90K - $100K</option>
                  <option value='$100K - 125K'>$100K - $125K</option>
                  <option value='$125K - 150K'>$125K - $150K</option>
                  <option value='$150K - 175K'>$150K - $175K</option>
                  <option value='$175K - 200K'>$175K - $200K</option>
                  <option value='Over $200K'>Over $200K</option>
                </select>
              </div>

              <div className='flex'>
                <Link
                  to='/company'
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline text-center'
                >
                  Go Back
                </Link>

                <button
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
