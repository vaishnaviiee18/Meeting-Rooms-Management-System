import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // "admin" or "clubRep"

  return (
    <Router>
      {/* Show the appropriate navbar based on the current path */}
      {window.location.pathname.startsWith("/admin") ? (
        <AdminNavbar />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <div className="p-6 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route
            path="/*"
            element={
              <UserRoutes
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
