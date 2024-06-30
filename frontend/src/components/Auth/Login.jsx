import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import backgroundImage from "/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
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
            <h3 className="text-2xl font-semibold">Login to your account</h3>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>Login As</label>
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
              onClick={handleLogin}
              className="p-3 text-center border-none mt-6 font-bold text-white bg-[#7469B6] hover:bg-[#6654cc] text-lg rounded-lg"
            >
              Login
            </button>
            <Link
              to="/register"
              className="p-3 text-center border border-[#7469B6] mt-6 font-bold text-[#7469B6] text-lg no-underline rounded-lg"
            >
              Register Now
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
