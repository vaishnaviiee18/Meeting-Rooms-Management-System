import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-purple-600 p-4 flex justify-between items-center text-white shadow-lg">
      <div className="text-2xl font-bold">
        <Link to="/">Campus Booking</Link>
      </div>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/rooms" className="hover:underline">Rooms</Link>
        <Link to="/requests" className="hover:underline">Requests</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </div>
      <div className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center">
          <FaUserCircle size={28} />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg text-gray-800">
            {isLoggedIn ? (
              <button 
                onClick={() => { setIsLoggedIn(false); setDropdownOpen(false); }} 
                className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                Logout
              </button>
            ) : (
              <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
