import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold">Asset Management</div>
            <div>
              <Link to="/assets" className="text-gray-600 hover:text-gray-800 px-3 py-2">Assets</Link>
              <Link to="/employees" className="text-gray-600 hover:text-gray-800 px-3 py-2">Employees</Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
