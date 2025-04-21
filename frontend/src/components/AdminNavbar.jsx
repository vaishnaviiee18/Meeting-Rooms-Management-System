import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const AdminNavbar = ({ setIsLoggedIn, setUserRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Track login state
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear any session or local storage data
    localStorage.removeItem("userRole"); // Remove role from localStorage

    // Reset other authentication flags
    setIsLoggedIn(false);
    setUserRole(""); // Clear the user role

    // Redirect to the club representative portal (instead of admin home)
    navigate("/club/home");  // Assuming this is the club rep home page
    setIsLoggedOut(true); // Update the logout state
  };

  // Handle login (if needed for Club Rep)
  const handleLogin = () => {
    // Redirect to login page
    navigate("/login"); // Assuming you have a login page route
    setIsLoggedOut(false); // Reset the logout state
  };

  return (
    <nav className="p-4 bg-purple-700 text-white flex justify-between items-center shadow-lg">
      {/* Left Side - Title & Navigation */}
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold">Campus Booking</h1>

        {/* Navigation Links */}
        <Link to="/admin/home" className="hover:text-gray-300 transition">
          Home
        </Link>

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
            {/* Conditionally render logout or login */}
            {isLoggedOut ? (
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogin} // Login option if logged out
              >
                Login
              </button>
            ) : (
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogout} // Logout option if logged in
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
