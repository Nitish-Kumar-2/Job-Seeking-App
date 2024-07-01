import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="flex flex-col py-20 pb-12">
        <div className="flex flex-col lg:flex-row h-[600px] lg:h-96 mb-6 min-w-full lg:min-w-[1500px] max-w-full lg:max-w-[1500px] mx-auto px-4 lg:px-0 relative">
          <div className="flex flex-col justify-center flex-1 text-center lg:text-left relative z-10 lg:z-auto">
            <h1 className="max-w-full lg:max-w-xl text-6xl">
              Find a job that suits
            </h1>
            <h1 className="max-w-full lg:max-w-xl text-6xl">
              your interests and skills
            </h1>
            <p className="mt-6 text-xl max-w-full lg:max-w-xl">
              Discover your dream career with our job-seeking app! Effortlessly
              browse tailored job listings, receive real-time alerts, and apply
              with a single click. Our intuitive design ensures a seamless
              experience, helping you connect with the perfect opportunities to
              advance your career and achieve your professional aspirations.
            </p>
          </div>
          <div className="flex-1 overflow-hidden absolute w-full h-full lg:static lg:w-auto lg:h-auto opacity-60 lg:opacity-100">
            <img
              src="/heroS.jpg"
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between lg:justify-evenly py-12 min-w-full lg:min-w-[1500px] max-w-full lg:max-w-[1500px] mx-auto gap-4 px-4 lg:px-0">
          {details.map((element) => (
            <div
              className="flex flex-col lg:flex-row gap-4 items-center bg-[#f1f3f6] w-full lg:w-56 py-4 px-4 lg:py-2.5 lg:px-2.5 hover:shadow-lg transition-shadow"
              key={element.id}
            >
              <div className="text-2xl bg-[#e9f9ff] flex items-center justify-center p-2.5 text-[#7469B6]">
                {element.icon}
              </div>
              <div>
                <p className="font-bold text-xl">{element.title}</p>
                <p className="text-sm text-gray-500 mt-1">{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
