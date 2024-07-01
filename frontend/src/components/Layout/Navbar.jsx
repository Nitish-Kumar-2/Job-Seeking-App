import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Logout } from "../../queries/getData";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogout=()=>{
    Logout();
    setIsAuthorized(false);
    navigateTo("/login");
  }
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
          <a href="/">
            <img src="/new_hirea.png" alt="logo" className="h-24 -mt-4 " />
          </a>
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
              className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:font-normal duration-300 ${
                location.pathname === "/" ? "underline text-white" : ""
              }`}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/job/getall"
              onClick={() => setShow(false)}
              className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:font-normal duration-200 ${
                location.pathname === "/job/getall"
                  ? "underline text-white "
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
              className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:font-normal duration-300 ${
                location.pathname === "/applications/me"
                  ? "underline text-white"
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
                  className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:font-normal duration-300 ${
                    location.pathname === "/job/post"
                      ? "underline text-white"
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
                  className={`text-[#f1f3f6] font-light text-lg relative transition-all hover:font-normal duration-300 ${
                    location.pathname === "/job/me"
                      ? "underline text-white "
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
