import React, { useState } from 'react';
import { useAuthDispatch, useAuthState } from '../context/authContext'
import { Link } from 'react-router-dom';
//import imgsvg from '../assets/img.svg'

const Navigation = () => {
  const user = useAuthState();
  const authDispatch = useAuthDispatch();
  const logout = () =>{
    authDispatch({
      type:"logout"
    })
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">
            <Link to="/">Animalizer</Link>
          </div>
          <div className="text-xl font-bold">
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar">
          <div className="lg:flex-grow">
            {/* Empty div for space between left and right nav items */}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end space-y-2 lg:space-y-0 lg:space-x-4">
            {user.isAuth ? (
              <>
                <Link
                  to="/createxample"
                  className="block lg:inline-block mt-4 lg:mt-0 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Create Example
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="block lg:inline-block mt-4 lg:mt-0 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition focus:outline-none"
                  >
                    {user.email}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
                      <Link
                        to="/user"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={toggleDropdown}
                    >
                        My Examples
                      </Link>
                      <div className="border-t border-gray-200"></div>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block lg:inline-block mt-4 lg:mt-0 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block lg:inline-block mt-4 lg:mt-0 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    );
};

export default Navigation