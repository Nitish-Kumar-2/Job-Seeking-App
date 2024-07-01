import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { handleReqJob } from "../../queries/getData";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await handleReqJob();
        setJobs(res.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }
  return (
    <section className="bg-[#f1f3f6] min-h-screen py-12 px-5">
      <div className="flex flex-col items-center mx-auto gap-8 w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl  text-center">ALL AVAILABLE JOBS</h1>
        <div className="flex flex-wrap justify-center gap-8 w-full py-8">
          {jobs &&
            jobs.map((element) => {
              console.log("🚀 ~ Jobs ~ jobs:", jobs)
              
              return (
                <div
                  key={element._id}
                  className="bg-white w-80 h-56 p-5 flex flex-col gap-2 justify-center hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="font-bold text-xl">{element.title}</p>
                  <p className="text-lg text-gray-500">{element.category}</p>
                  <p className="text-base text-gray-500">{element.country}</p>
                  <Link
                    to={`/job/${element._id}`}
                    className="text-lg text-white rounded-lg hover:bg-[#7469B6] bg-[#887dc6] py-2 block text-center transition-all duration-300"
                  >
                    Job Details
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
export default Jobs;
