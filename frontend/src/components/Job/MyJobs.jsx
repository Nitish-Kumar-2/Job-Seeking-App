import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchJobs();
  }, []);

  // Redirect if not authorized or not an employer
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  // Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
      fetchJobs(); 
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl text-center mb-8">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {myJobs.map((job) => (
              <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={job.title}
                    onChange={(e) =>
                      handleInputChange(job._id, "title", e.target.value)
                    }
                    disabled={editingMode !== job._id}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={job.country}
                    onChange={(e) =>
                      handleInputChange(job._id, "country", e.target.value)
                    }
                    disabled={editingMode !== job._id}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={job.city}
                    onChange={(e) =>
                      handleInputChange(job._id, "city", e.target.value)
                    }
                    disabled={editingMode !== job._id}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={job.category}
                    onChange={(e) =>
                      handleInputChange(job._id, "category", e.target.value)
                    }
                    disabled={editingMode !== job._id}
                  >
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">
                      Mobile App Development
                    </option>
                    <option value="Frontend Web Development">
                      Frontend Web Development
                    </option>
                    <option value="MERN Stack Development">
                      MERN Stack Development
                    </option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">
                      Artificial Intelligence
                    </option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="MEAN Stack Development">
                      MEAN Stack Development
                    </option>
                    <option value="MEVN Stack Development">
                      MEVN Stack Development
                    </option>
                    <option value="Data Entry Operator">
                      Data Entry Operator
                    </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  {job.fixedSalary ? (
                    <input
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={job.fixedSalary}
                      onChange={(e) =>
                        handleInputChange(job._id, "fixedSalary", e.target.value)
                      }
                      disabled={editingMode !== job._id}
                    />
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        className="w-1/2 border-gray-300 rounded-md shadow-sm"
                        value={job.salaryFrom}
                        onChange={(e) =>
                          handleInputChange(job._id, "salaryFrom", e.target.value)
                        }
                        disabled={editingMode !== job._id}
                      />
                      <input
                        type="number"
                        className="w-1/2 border-gray-300 rounded-md shadow-sm"
                        value={job.salaryTo}
                        onChange={(e) =>
                          handleInputChange(job._id, "salaryTo", e.target.value)
                        }
                        disabled={editingMode !== job._id}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={job.description}
                    onChange={(e) =>
                      handleInputChange(job._id, "description", e.target.value)
                    }
                    disabled={editingMode !== job._id}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={job.location}
                    onChange={(e) =>
                      handleInputChange(job._id, "location", e.target.value)
                    }
                    disabled={editingMode !== job._id}
                  />
                </div>
                <div className="flex justify-between">
                  {editingMode === job._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateJob(job._id)}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-800 hover:text-white bg-green-200 hover:bg-green-600 border border-transparent rounded-md shadow-sm"
                      >
                        <FaCheck className="w-5 h-5 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => handleDisableEdit()}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-800 hover:text-white bg-red-200 hover-bg-red-600 mr-2 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                      >
                        <RxCross2 className="w-5 h-5 mr-2" />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnableEdit(job._id)}
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-yellow-800 hover:bg-yellow-600 mr-2 bg-yellow-200 border hover:text-white border-transparent rounded-md shadow-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-red-800 hover:text-white bg-red-200 hover-bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-center mt-8">
            You haven't posted any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
