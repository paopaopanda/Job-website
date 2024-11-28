import React from "react";
import Hero from "../components/Hero";
import Cards from "../components/Cards";
import JobList from "../components/JobList";
import ViewAllJob from "../components/ViewAllJob";
import { useState } from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Cards />
      <JobList HomePage={true} applyPage={false} />
      <ViewAllJob />
    </>
  );
};

export default HomePage;
