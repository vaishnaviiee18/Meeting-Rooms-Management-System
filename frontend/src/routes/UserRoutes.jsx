import { Routes, Route } from "react-router-dom";
import Home from "../pages/User/Home";
import Requests from "../pages/User/Requests";
import Login from "../pages/User/Login";
import Signup from "../pages/User/Signup";
import AboutUs from "../pages/User/AboutUs";
import Rooms from "../pages/User/Rooms";
import BookingPage from "../pages/User/BookingPage";
import LetterPage from "../pages/User/LetterPage";
import MyBookings from "../pages/User/MyBookings.jsx";

const UserRoutes = ({ setIsLoggedIn, setUserRole }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/book-room" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />

      {/* ✅ Route for viewing the letter */}
      <Route path="/view-letter/:id" element={<LetterPage />} />
    </Routes>
  );
};

export default UserRoutes;
