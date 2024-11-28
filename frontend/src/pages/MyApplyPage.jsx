import React from "react";
import JobList from "../components/JobList";

const MyApplyPage = () => {
  return (
    <>
      <JobList HomePage={false} applyPage={true} />
    </>
  );
};

export default MyApplyPage;
