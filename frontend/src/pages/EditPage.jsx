import React, { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const EditPage = ({}) => {
  const { id } = useParams();

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");

  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const UpdateJob = {
      id: id,
      title: name,
      type,
      description,
      salary,
    };
    console.log(UpdateJob);

    const res = await fetch(`/api/company/job/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdateJob),
    });

    if (res.ok) {
      nav("/job-list");
    }
  };

  const getJob = async () => {
    const res = await fetch(`/api/company/job/${id}`);

    const job = await res.json();

    setType(job.type);
    setName(job.title);
    setDescription(job.description);
    setSalary(job.salary);

    console.log("get job ", job);
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <>
      <section className='bg-indigo-50'>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitHandler}>
              <h2 className='text-3xl text-center font-semibold mb-6'>
                Edit Job
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
                  Job Listing Name
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

              <div>
                <button
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Edit Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditPage;
