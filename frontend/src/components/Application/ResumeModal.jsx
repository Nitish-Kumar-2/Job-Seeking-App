import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center">
      <span
          className="absolute top-4 right-4 text-5xl text-red-500 cursor-pointer"
          onClick={onClose}
        >
          &times;
          </span>
        <div className=" relative">
        
        
        <img src={imageUrl} alt="resume" className="max-w-xl h-auto" />
      </div>
    </div>
  );
};

export default ResumeModal;
