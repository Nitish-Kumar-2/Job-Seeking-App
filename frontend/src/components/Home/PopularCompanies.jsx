import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="bg-[#f1f3f6] py-12">
      <div className="max-w-full lg:max-w-[1500px] mx-auto flex flex-col items-center gap-8 px-4 lg:px-0">
        <h3 className="text-center text-5xl mb-4">TOP COMPANIES</h3>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8 w-full">
          {companies.map((element) => (
            <div
              className="w-full lg:w-[340px] bg-white p-5 flex flex-col gap-3 shadow transition-shadow  hover:shadow-lg"
              key={element.id}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl p-2.5 bg-[#e9f9ff] text-[#7469B6] flex items-center justify-center">
                  {element.icon}
                </div>
                <div className="flex flex-col">
                  <p className="font-bold mb-1 text-lg">{element.title}</p>
                  <p className="text-sm text-gray-500">{element.location}</p>
                </div>
              </div>
              <button className="text-[#7469B6] bg-[#e9f9ff] font-bold text-lg border-none py-2.5 mt-2">
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
