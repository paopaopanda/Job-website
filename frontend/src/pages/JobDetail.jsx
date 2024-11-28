import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { useLoginAuth } from "../components/AuthLogin";

const JobDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [job, setJob] = useState("");
  const loginAuth = useLoginAuth();
  let style =
    "bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block";

  if (!loginAuth.isCompany && loginAuth.isLogin && job.status != null) {
    style =
      "bg-gray-500 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block";
  }

  async function getJob() {
    const res = await fetch(`/api/company/job/${id}`);

    const job = await res.json();

    setJob(job);

    console.log("get job ", job);
  }

  async function deleteJob() {
    const res = await fetch(`/api/company/job/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      nav("/job-list");
    }
  }

  async function applyJob() {
    const newApply = {
      job_id: id,
      status: "SEND",
    };

    const res = await fetch(`/api/applyJob/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newApply),
    });

    const data = await res.json();

    console.log("我要走囉", data);

    if (res.ok) {
      nav("/job-list");
    }
  }

  useEffect(() => {
    getJob();
  }, []);

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/jobsList'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <i className='fas fa-arrow-left mr-2'></i> Back to Home
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Job Description
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                  Salary
                </h3>

                <p className='mb-4'>{job.salary}/ Year</p>

                {loginAuth.isCompany ? (
                  <>
                    <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                      <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                      <Link
                        to={`/edit-job/${id}`}
                        className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                      >
                        Edit Job
                      </Link>
                      <button
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                        onClick={deleteJob}
                      >
                        Delete Job
                      </button>
                    </div>

                    <div>
                      <Link
                        to={`/apply/${id}`}
                        className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                      >
                        View applies
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <aside>
                      <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                        <h2 className='text-2xl'>
                          Company Name: {job.companyName}
                        </h2>

                        <hr className='my-4' />
                      </div>
                    </aside>

                    {loginAuth.isLogin ? (
                      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                        <button
                          className={style}
                          onClick={applyJob}
                          disabled={job.status != null}
                        >
                          {job.status == "SEND"
                            ? "Already applied"
                            : "Apply job"}
                        </button>
                      </div>
                    ) : (
                      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                        <p>LOG IN first</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export { JobDetail as default };
