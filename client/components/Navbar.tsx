import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/rtk/store';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user); // Assuming RootState is the root state type of your Redux store
console.log(user)
useEffect(() => {
  
}, [user])

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link className="text-white font-bold text-xl" href="/" >
            7agat
          </Link>

          {/* User Info */}
          {user && (
            <div className="text-white">
              Welcome, {user.firstName} {user.lastName}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
