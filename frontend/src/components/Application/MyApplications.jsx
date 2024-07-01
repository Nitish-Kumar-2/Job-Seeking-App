import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="bg-gray-100 py-12 px-4 min-h-screen">
      {user && user.role === "Job Seeker" ? (
        <div className="max-w-screen-lg gap-9 mx-auto">
          <h1 className="text-5xl text-center">My Applications</h1>
          {applications.length <= 0 ? (
            <h4 className="text-xl sm:text-3xl text-center">No Applications Found</h4>
          ) : (
            applications.map((element) => {
              return (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
              />
            );
          })
          )}
        </div>
      ) : (
        <div className="max-w-screen-lg flex flex-col gap-9 mx-auto">
          <h1 className="text-5xl text-center">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4 className="text-xl sm:text-3xl text-center">No Applications Found</h4>
          ) : (
            applications.map((element) => {
              return (
              <EmployerCard 
              element={element} 
              key={element._id}
              />
            );
          })
          )}
        </div>
      )}
    </section>
  );
};

export default MyApplications;


const JobSeekerCard = ({ element, deleteApplication }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start md:items-center border-b border-gray-200 py-5">
      <div className="flex-grow flex flex-col gap-1 md:gap-2">
        <p><span className="font-bold">Name:</span> {element.name}</p>
        <p><span className="font-bold">Email:</span> {element.email}</p>
        <p><span className="font-bold">Phone:</span> {element.phone}</p>
        <p><span className="font-bold">Address:</span>
        <span className="max-w-md block break-words">{element.address}</span></p>
        <p>
          <span className="font-bold">Cover Letter:</span> 
          <span className="max-w-md block break-words">{element.coverLetter}</span>
        </p>
      </div>
      <div className="relative h-64 w-full md:w-64 mt-5 md:mt-0 md:mx-5">
        <iframe
          src={element.resume.url}
          className="w-full h-full border-none"
          title="PDF Viewer"
        />
      </div>
      <div className="flex items-center justify-center w-full md:w-auto mt-5 md:mt-0">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-200 hover:text-white text-red-800 hover:bg-red-600 py-2.5 px-7 text-lg rounded-lg font-medium"
        >
          Delete Application
        </button>
      </div>
    </div>
    
  );
};


const EmployerCard = ({ element }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-200 py-5">
      <div className="flex-grow flex flex-col gap-1 md:gap-2">
        <p><span className="font-bold">Name:</span> {element.name}</p>
        <p><span className="font-bold">Email:</span> {element.email}</p>
        <p><span className="font-bold">Phone:</span> {element.phone}</p>
        <p><span className="font-bold">Address:</span> {element.address}</p>
        <p><span className="font-bold">Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="relative h-64 w-full md:w-64 mt-5 md:mt-0 md:mx-5">
        <iframe
          src={element.resume.url}
          className="w-full h-full border-none"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

