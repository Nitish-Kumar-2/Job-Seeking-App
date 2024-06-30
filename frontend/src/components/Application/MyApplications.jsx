import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

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

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="bg-gray-100 py-12 px-4 min-h-screen">
      {user && user.role === "Job Seeker" ? (
        <div className="max-w-screen-lg gap-9 mx-auto">
          <h1 className="text-5xl text-center">My Applications</h1>
          {applications.length <= 0 ? (
            <h4 className="text-xl sm:text-3xl text-center">No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="max-w-screen-lg flex flex-col gap-9 mx-auto">
          <h1 className="text-5xl text-center">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4 className="text-xl sm:text-3xl text-center">No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-300 py-5 gap-4 items-center text-center sm:text-left">
      <div className="flex-2 flex flex-col gap-1 pr-4 w-full sm:w-auto">
        <p>
          <span className="font-bold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-bold">Address:</span> {element.address}
        </p>
        <div >
          <span className="font-bold">Cover Letter:</span>
          <p >{element.coverLetter}</p>
        </div>
      </div>
      <div className="relative h-52 sm:h-64 flex-1 w-full sm:w-auto flex items-center justify-center">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="flex-1 flex items-center justify-center w-full sm:w-auto sm:ml-auto">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-200 text-red-800 hover:text-white py-2 rounded-lg px-4 sm:px-6 text-sm sm:text-lg font-medium hover:bg-red-600"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-300 py-5 gap-4 items-center text-center sm:text-left">
      <div className="flex flex-col gap-1 pr-4 w-full sm:w-auto">
        <p>
          <span className="font-bold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-bold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-bold">Address:</span> {element.address}
        </p>
        <div >
          <span className="font-bold">Cover Letter:</span>
          <p >{element.coverLetter}</p>
        </div>
      </div>
      <div className="relative h-52 sm:h-64 flex-1 w-full sm:w-auto flex items-center justify-center">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};

