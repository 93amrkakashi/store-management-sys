import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center bg-gray-900 text-white p-4 text-center h-[5vh] sticky bottom-0  z-10">
      <p className="text-sm">
        Made With <span className="text-red-400 font-bold "> &hearts; </span> By 
        <a
          className="text-blue-400 font-bold "
          href="https://portfolio-tw-ts.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
           
          Amr Kakashi 
        </a>
        | All rights reserved {currentYear} &copy;
      </p>
    </footer>
  );
};

export default Footer;
