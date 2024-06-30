import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import TextareaAutosize from "react-textarea-autosize";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="bg-[#f1f3f6] py-12 px-5 min-h-96 flex items-center">
      <div className="max-w-4xl w-full flex flex-col gap-8 items-center mx-auto">
        <h3 className="text-4xl lg:text-5xl text-center">POST NEW JOB</h3>
        <form onSubmit={handleJobPost} className="w-full flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-5 ">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              className="flex-1 text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN Stack Development">MERN STACK Development</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN STACK Development</option>
              <option value="MEVN Stack Development">MEVN STACK Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 ">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="flex-1 text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="flex-1 text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
            />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none w-full"
          />
          <div className="flex flex-col gap-4">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {salaryType === "default" ? (
              <p className="text-red-500 text-sm font-light">Please provide Salary Type *</p>
            ) : salaryType === "Fixed Salary" ? (
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                className="text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none w-full"
              />
            ) : (
              <div className="flex flex-col sm:flex-row gap-5 ]">
                <input
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  className="flex-1 text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  className="flex-1 text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none"
                />
              </div>
            )}
          </div>
          <TextareaAutosize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className="text-lg py-2 px-3 bg-transparent border-b border-gray-400 focus:outline-none w-full resize-none"
            minRows={3}
          />
          <button
            type="submit"
            className="w-full bg-[#7469B6] hover:bg-[#5e50ab] rounded-lg mt-4 text-white text-lg font-semibold py-3 px-6 transition-all duration-300"
          >
            CREATE JOB
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
