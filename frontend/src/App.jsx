import { BrowserRouter as Router } from "react-router-dom";
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
      {/* Show different navbar based on user role */}
      {userRole === "admin" ? (
        <AdminNavbar />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <div className="p-6 min-h-screen bg-gray-50">
        {/* Render routes based on user role */}
        {userRole === "admin" && isLoggedIn ? (
          <AdminRoutes />
        ) : (
          <UserRoutes setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
        )}
      </div>
    </Router>
  );
}

export default App;
