// Navbar.jsx
import { FaBars } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import './Navbar.css';

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 backdrop-blur-lg z-50"
          onClick={closeSidebar}
        />
      )}

      <nav className={`bg-indigo-600 p-4 relative ${isSidebarOpen ? 'sidebar sidebar-open' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {!isSidebarOpen &&
              <Link to="/" className="text-white font-bold text-lg">
                <AiOutlineStock size={32} /> Trade Viewer
              </Link>
            }
          </div>


          <div className="lg:hidden">
            <button className="text-white focus:outline-none" onClick={toggleSidebar}>
              {isSidebarOpen ? '' : <FaBars size={24} />}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
            <Link to="/about" className="text-white hover:underline">
              About
            </Link>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </div>

          {isSidebarOpen && (

            <div className="lg:hidden bg-indigo-600 fixed bottom-0 left-0 h-full w-40 backdrop-blur-md z-50">
              <div>
                <button className="text-white focus:outline-none p-4" onClick={closeSidebar}>
                  <IoCloseSharp size={32} />

                </button>
                <Link to="/" className="text-white font-bold text-lg flex items-center pb-3 hover:no-underline">
                  <AiOutlineStock size={32} className="mr-2" />
                  <div className="whitespace-nowrap">
                    Trade<br /> Viewer
                  </div>
                </Link>
              </div>
              <div className="flex flex-col items-start">
                <div>
                  <Link to="/" className="text-white p-4 hover:underline mr-0" onClick={closeSidebar}>
                    Home
                  </Link>
                </div>
                <Link to="/about" className="text-white p-4 hover:underline" onClick={closeSidebar}>
                  About
                </Link>
                {/* Move the Login link to the bottom left */}
                <Link to="/login" className="text-white p-4 hover:underline mt-auto" onClick={closeSidebar}>
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>

  );
}
