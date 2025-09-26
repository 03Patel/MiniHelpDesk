import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ auth, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <h1
          className="text-xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          🎫 Helpdesk App
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-200 transition">
            Dashboard
          </Link>
          

          {auth ? (
            <>
              <Link to="/admin" className="hover:text-gray-200 transition">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
             <Link to="/create" className="hover:text-gray-200 transition">
              Create Ticket
            </Link>
            <Link
              to="/login"
              className="ml-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Admin Login
            </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-2xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          {auth ? (
            <>
              <Link
                to="/admin"
                className="block px-4 py-2 hover:bg-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-red-500 bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
            <Link to="/create" className="hover:text-gray-200 transition">
              Create Ticket
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-green-500 bg-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
