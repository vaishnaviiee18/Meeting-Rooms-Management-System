import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="p-4 bg-purple-700 text-white flex justify-between items-center shadow-lg">
      {/* Left Side - Title & Navigation */}
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold">Campus Booking</h1>
        <Link to="/admin/requests" className="hover:text-gray-300 transition">
          All Requests
        </Link>
        <Link to="/admin/clubs" className="hover:text-gray-300 transition">
          All Clubs
        </Link>
      </div>

      {/* Right Side - Profile Icon with Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="focus:outline-none"
        >
          <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-300" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setDropdownOpen(false);
                alert("Logging out...");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
