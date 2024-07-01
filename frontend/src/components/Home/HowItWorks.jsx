import React, { useContext } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Logout } from "../../queries/getData";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const HowItWorks = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogOut=()=>{
    Logout();
    setIsAuthorized(false);
    navigateTo("/register");
  }
  return (
    <div className="bg-[#f1f3f6]">
      <div className=" mx-auto flex flex-col items-center py-12 gap-12 px-4 lg:px-0 lg:py-12 lg:gap-12 max-w-full lg:max-w-[1500px]">
        <h3 className="text-center text-5xl  mb-4">
          How JobZee Works
        </h3>
        <div onClick={handleLogOut} className=" flex flex-col lg:flex-row justify-between gap-6 lg:gap-6 w-full">
          <div className=" bg-white text-center flex flex-col items-center justify-center flex-1 h-80 p-6 lg:p-8 gap-3 shadow-md">
            <FaUserPlus className="text-3xl text-[#7469B6]" />
            <p className="text-xl font-semibold">Create Account</p>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
          <a href="/job/getall" className=" bg-[#7469B6] text-white text-center flex flex-col items-center justify-center flex-1 h-80 p-6 lg:p-8 gap-3 shadow-md">
            <MdFindInPage className="text-3xl text-white" />
            <p className="text-xl font-semibold">Find a Job/Post a Job</p>
            <p className="text-gray-800 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </a>
          <a href="/job/getall" className=" bg-white text-center flex flex-col items-center justify-center flex-1 h-80 p-6 lg:p-8 gap-3 ">
            <IoMdSend className="text-3xl text-[#7469B6]" />
            <p className="text-xl font-semibold">
              Apply For Job/Recruit Suitable Candidates
            </p>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </a>  
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
