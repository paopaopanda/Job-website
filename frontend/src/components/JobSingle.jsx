import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const JobSingle = ({ job, applyPage }) => {
  const description = job.description.substring(0, 90) + "...";
  let bg = "bg-white";

  if (
    job.status !== undefined &&
    job.status !== null &&
    job.status !== "SEND"
  ) {
    bg = "bg-gray-300";
  }

  const location = useLocation();
  const companyKey = location.state?.companyKey;

  let [fullDescription, setFullDescription] = useState(false);

  return (
    <div className={`${bg} rounded-xl shadow-md relative`}>
      <div className='p-4'>
        <div className='mb-6'>
          <div className='text-gray-600 my-2'></div>
          <h3 className='text-xl font-bold'>{job.title}</h3>
        </div>

        <div className='mb-1'>
          {!fullDescription ? description : job.description}
        </div>

        <button
          className='text-sm mb-5 text-indigo-500 hover:text-indigo-600'
          onClick={() => setFullDescription((prviouState) => !prviouState)}
        >
          {!fullDescription ? "Read More" : "Show Less"}
        </button>

        <h3 className='text-indigo-500 mb-2'>{job.salary}/ Year</h3>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          {applyPage ? (
            <div className='flex gap-2 justify-start'>
              <h3>status: </h3>
              <p>{job.status}</p>
            </div>
          ) : (
            <Link
              to={`/${job.id}`}
              className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSingle;
