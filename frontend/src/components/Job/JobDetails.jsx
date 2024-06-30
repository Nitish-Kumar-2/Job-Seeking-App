import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="bg-[#f1f3f6] py-12 px-5 flex flex-col items-center justify-center min-h-96">
    <div className="max-w-[1500px] mx-auto flex flex-col items-center justify-center w-full px-4 md:px-8">
      <h3 className="text-5xl">Job Details</h3>
        <div className=" w-full min-h-96 py-12 flex flex-col gap-6 justify-center">
          <p className="font-bold text-[#7469B6]">
            Title: <span className="text-[#18191c] font-normal"> {job.title}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            Category: <span className="text-[#18191c] font-normal">{job.category}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            Country: <span className="text-[#18191c] font-normal">{job.country}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            City: <span className="text-[#18191c] font-normal">{job.city}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            Location: <span className="text-[#18191c] font-normal">{job.location}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            Description: <span className="text-[#18191c] font-normal">{job.description}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            Job Posted On: <span className="text-[#18191c] font-normal">{job.jobPostedOn}</span>
          </p>
          <p className="font-bold text-[#7469B6]">
            Salary:{" "}
            {job.fixedSalary ? (
              <span className="text-[#18191c] font-normal">{job.fixedSalary}</span>
            ) : (
              <span className="text-[#18191c] font-normal">
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link
              to={`/application/${job._id}`}
              className="bg-[#7469B6] hover:bg-[#6d5fbb] rounded-lg text-white text-[20px] font-normal border-none px-[30px] py-[12px] no-underline mt-2.5 w-fit"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
