import React from "react";
import JobList from "../components/JobList";

const JobsListPage = () => {
  return (
    <>
      <JobList HomePage={false} applyPage={false} />
    </>
  );
};

export default JobsListPage;
