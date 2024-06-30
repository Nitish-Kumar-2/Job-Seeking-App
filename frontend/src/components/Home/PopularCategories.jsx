import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  return (
    <div className="flex flex-col mx-auto py-12 gap-9 max-w-full lg:max-w-[1500px] px-4 lg:px-0">
      <h3 className="text-center text-5xl  mb-4">POPULAR CATEGORIES</h3>
      <div className="flex flex-wrap justify-center lg:justify-between gap-8 lg:gap-8">
        {categories.map((element) => (
          <div
            className="flex w-80 lg:w-[320px] box-border m-1 p-3 bg-[#f1f3f6] items-center gap-3 shadow transition-shadow hover:shadow-lg"
            key={element.id}
          >
            <div className="text-2xl p-2.5 bg-[#e9f9ff] text-[#7469B6] flex items-center justify-center">
              {element.icon}
            </div>
            <div className="text ">
              <p className="text-lg font-bold">{element.title}</p>
              <p className="text-sm font-light text-gray-500">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
