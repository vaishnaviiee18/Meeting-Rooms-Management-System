import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/Admin/AdminHome";
import AllRequests from "../pages/Admin/AllRequests";
import AllClubs from "../pages/Admin/AllClubs";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<AdminHome />} />
      <Route path="requests" element={<AllRequests />} />
      <Route path="clubs" element={<AllClubs />} />
      {/* Redirect unknown admin routes to the home page */}
      <Route path="*" element={<Navigate to="/admin/home" />} />
    </Routes>
  );
};

export default AdminRoutes;
