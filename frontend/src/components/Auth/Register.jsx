import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import backgroundImage from "/login.jpg"; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="relative min-h-screen">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        opacity: 0.8, 
      }}
    ></div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-5 w-96 md:w-[500px] md:p-10 rounded-lg shadow-lg relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold">Create a new account</h3>
          </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <label>Register As</label>
            <div className="flex items-center rounded-lg">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-200 p-2 border-none w-full h-full focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser className="w-10 text-xl bg-[#7469B6] h-full p-2 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <label>Name</label>
            <div className="flex items-center rounded-lg">
              <input
                type="text"
                placeholder="Zeeshan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 p-2 border-none w-full h-full focus:outline-none"
              />
              <FaPencilAlt className="w-10 text-xl bg-[#7469B6] h-full p-2 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <label>Email Address</label>
            <div className="flex items-center rounded-lg">
              <input
                type="email"
                placeholder="zk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 p-2 border-none w-full h-full focus:outline-none"
              />
              <MdOutlineMailOutline className="w-10 text-xl bg-[#7469B6] h-full p-2 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <label>Phone Number</label>
            <div className="flex items-center rounded-lg">
              <input
                type="number"
                placeholder="12345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-200 p-2 border-none w-full h-full focus:outline-none"
              />
              <FaPhoneFlip className="w-10 text-xl bg-[#7469B6] h-full p-2 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <label>Password</label>
            <div className="flex items-center rounded-lg">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 p-2 border-none w-full h-full focus:outline-none"
              />
              <RiLock2Fill className="w-10 text-xl bg-[#7469B6] h-full p-2 text-white" />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="p-3 text-center border-none mt-6 font-bold text-white bg-[#7469B6]  hover:bg-[#6654cc] text-lg rounded-lg"
          >
            Register
          </button>
          <Link
            to="/login"
            className="p-3 text-center border border-[#7469B6] mt-6 font-bold text-[#7469B6] text-lg no-underline rounded-lg"
          >
            Login Now
          </Link>
        </form>
      </div>
      </div>
    </section>
  );
};

export default Register;
