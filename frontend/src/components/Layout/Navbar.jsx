import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  return (
    <nav
      className={`p-3 bg-[#7469B6] ${
        isAuthorized ? "block" : "hidden"
      } ${show ? "h-auto" : "h-24"} md:min-w-[1500px] min-w-full`}
    >
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-44 h-20">
            <img src="/new_hirea.png" alt="logo" className="w-full h-full" />
          </div>
        </div>
        <ul
          className={`${
            show
              ? "absolute top-20 left-0 w-80 h-96 bg-[#7469B6] flex flex-col items-start gap-8 p-6 shadow-lg z-50"
              : "hidden"
          } md:flex md:items-center md:gap-6 text-gray-300 flex-grow justify-center`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setShow(false)}
              className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:text-black duration-300 ${
                location.pathname === "/" ? "underline text-black" : ""
              }`}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/job/getall"
              onClick={() => setShow(false)}
              className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:text-black duration-300 ${
                location.pathname === "/job/getall"
                  ? "underline text-black"
                  : ""
              }`}
            >
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to="/applications/me"
              onClick={() => setShow(false)}
              className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:text-black duration-300 ${
                location.pathname === "/applications/me"
                  ? "underline text-black"
                  : ""
              }`}
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link
                  to="/job/post"
                  onClick={() => setShow(false)}
                  className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:text-black duration-300 ${
                    location.pathname === "/job/post"
                      ? "underline text-black"
                      : ""
                  }`}
                >
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link
                  to="/job/me"
                  onClick={() => setShow(false)}
                  className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:text-black duration-300 ${
                    location.pathname === "/job/me"
                      ? "underline text-black "
                      : ""
                  }`}
                >
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="border text-[#f1f3f6] px-3 py-2 rounded-lg text-lg font-light hover:text-white hover:bg-[#7263c5] hover:font-bold transition-all duration-300 "
          >
            LOGOUT
          </button>
          <div className="md:hidden text-[#f1f3f6] text-3xl">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
