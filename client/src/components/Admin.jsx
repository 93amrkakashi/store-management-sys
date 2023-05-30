import React from 'react';

const Admin = () => {
  return (
    <div className="min-w-full h-full   p-8">
      <h1 className="text-2xl mb-4">Admin Panel</h1>
      
      <div className="flex flex-wrap -mx-4 text-white">
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Users</h2>
            {/* Add user-related content */}
          </div>
        </div>
        
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Products</h2>
            {/* Add product-related content */}
          </div>
        </div>
        
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Charts</h2>
            {/* Add chart-related content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
