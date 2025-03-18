import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        
        <label className="block text-gray-700">Sign up as</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mt-1 border rounded bg-yellow-100">
          <option>Admin</option>
          <option>Club representative</option>
        </select>

        <input className="w-full p-2 mt-2 border rounded" placeholder="Email" />
        <input className="w-full p-2 mt-2 border rounded" placeholder="Password" type="password" />

        {role === "Club representative" && (
          <select className="w-full p-2 mt-2 border rounded bg-yellow-100">
            <option>Club A</option>
            <option>Club B</option>
            <option>Club C</option>
          </select>
        )}

        <button onClick={() => navigate("/login")} className="w-full mt-4 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
