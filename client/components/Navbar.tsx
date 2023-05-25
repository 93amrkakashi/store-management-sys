import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/rtk/store';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user); // Assuming RootState is the root state type of your Redux store
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log(user);

  useEffect(() => {

  }, [user]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <span className="text-white font-bold text-xl cursor-pointer">7agat</span>
          </Link>

          {/* User Info */}
          {user && (
            <div className="relative">
              <button
                type="button"
                className="text-white focus:outline-none"
                onClick={handleDropdownToggle}
              >
                {user.firstName} {user.lastName}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline-block ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12l-6-6h12l-6 6z"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
                  onClick={handleDropdownClose}
                >
                  <Link href="/admin-panel">
                    <span className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200">Admin Panel</span>
                  </Link>
                  <Link href="/overview">
                    <span className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200">Overview</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
