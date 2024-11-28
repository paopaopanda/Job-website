import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useLoginAuth } from "./AuthLogin";
import ApplySingle from "./ApplySingle";
import App from "../App";

const ApplyList = ({ HomePage }) => {
  const { id } = useParams();
  const location = useLocation();
  const loginAuth = useLoginAuth();
  const companyKey = location.state?.companyKey;
  const [Apply, setRecentApply] = useState([]);

  async function getApply() {
    console.log("------------");
    try {
      let res = await fetch(`/api/applyJob/${id}`);
      let data = await res.json();

      if (HomePage === true) {
        setRecentApply(data.slice(0, 3));
      } else {
        setRecentApply(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getApply();
  }, [HomePage]);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <div className='flex justify-center '>
          <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
            All Applier
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* <!-- apply Listing 1 --> */}

          {Apply.map((apply) => (
            <ApplySingle key={apply.User.id} apply={apply} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplyList;
