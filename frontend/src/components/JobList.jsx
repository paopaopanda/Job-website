import React, { useEffect, useState } from "react";
import JobSingle from "./JobSingle";
import { Link, useParams, useLocation } from "react-router-dom";
import { useLoginAuth } from "../components/AuthLogin";

const JobList = ({ HomePage, applyPage }) => {
  const params = useParams();
  const location = useLocation();
  const loginAuth = useLoginAuth();
  const companyKey = location.state?.companyKey;
  const [RecentJobs, setRecentJobs] = useState([]);

  async function getJobs() {
    try {
      let res = await fetch("/api/company/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyKey: companyKey,
        }),
      });
      let data = await res.json();
      if (HomePage === true) {
        // console.log(data);
        setRecentJobs(data.slice(0, 3));
      } else {
        setRecentJobs(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getApplyJobs() {
    try {
      let res = await fetch(`/api/applyJob/myApply`);
      let data = await res.json();

      if (data.length <= 0) {
        return;
      }

      setRecentJobs(data);

      console.log("recent job", data);
      // console.log("recent len", RecentJobs.length);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("applyPage= ", applyPage);
    if (applyPage) {
      // console.log("apply job");
      getApplyJobs();
    } else {
      // console.log("get job");
      getJobs();
    }
  }, [HomePage, applyPage]);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <div className='flex justify-center '>
          <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
            All Jobs
          </h2>
          {loginAuth.isCompany && (
            <Link
              to={`/add-job`}
              className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm ml-10'
              state={{ companyKey }}
            >
              Add Job
            </Link>
          )}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* <!-- Job Listing 1 --> */}

          {RecentJobs.length == 0
            ? null
            : RecentJobs.map((job) => (
                <JobSingle
                  key={job.id}
                  job={job}
                  applyPage={applyPage}
                  state={{ companyKey }}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default JobList;
