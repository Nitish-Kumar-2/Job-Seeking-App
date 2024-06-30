import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer
      className={`${
        isAuthorized ? "flex" : "hidden"
      } flex-col lg:flex-row bg-[#7469B6] justify-between items-center py-6 px-6 lg:px-28 text-[#f1f3f6]`}
    >
      <div className="flex items-center justify-center lg:justify-start text-lg mb-4 lg:mb-0">
        &copy; All Rights Reserved By NitishKumar.
      </div>
      <div className="flex justify-center lg:justify-end gap-6 lg:gap-3 text-2xl">
        <Link
          to="https://www.facebook.com/profile.php?id=100030535123397"
          target="_blank"
        >
          <FaFacebookF />
        </Link>
        <Link
          to="https://www.youtube.com/@CodeWithZeeshu"
          target="_blank"
        >
          <FaYoutube />
        </Link>
        <Link
          to="https://www.linkedin.com/"
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link
          to="https://www.instagram.com/z_4_zeeshuuu/"
          target="_blank"
        >
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
