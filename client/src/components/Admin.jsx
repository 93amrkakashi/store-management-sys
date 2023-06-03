import React from "react";
import { FaUsers } from "react-icons/fa";
import { BsFillBarChartFill } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-w-full h-full p-8 text-center bg-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-white">Admin Panel</h1>

      <div className="flex items-center justify-around flex-wrap gap-5  text-white">
        <Link to="/" className="w-full md:w-1/3 m-6">
          <div className="bg-gray-900 p-4 rounded-md flex flex-col items-center">
            <AiOutlineAppstoreAdd className="text-5xl text-white mb-2" />
            <h2 className="text-lg font-semibold mb-2">Products</h2>
          </div>
        </Link>

        <Link to="/admin/users" className="w-full md:w-1/3 m-6">
          <div className="bg-gray-900 p-4 rounded-md flex flex-col items-center">
            <FaUsers className="text-5xl mb-2" />
            <h2 className="text-lg font-semibold mb-2">Users</h2>
          </div>
        </Link>

        <Link to="/admin/charts" className="w-full md:w-1/3 m-6">
          <div className="bg-gray-900 p-4 rounded-md flex flex-col items-center">
            <BsFillBarChartFill className="text-5xl mb-2" />
            <h2 className="text-lg font-semibold mb-2">Charts</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
