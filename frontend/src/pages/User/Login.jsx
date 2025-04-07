import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@college.com" && password === "admin123") {
      setIsLoggedIn(true);
      setUserRole("admin"); // Set role as admin
      navigate("/admin/home"); // Redirect to Admin Portal
    } else {
      setIsLoggedIn(true);
      setUserRole("clubRep"); // Set role as Club Representative
      navigate("/"); // Redirect to user home
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <input 
          className="w-full p-2 mt-2 border rounded" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          className="w-full p-2 mt-2 border rounded" 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <p className="text-blue-600 mt-2 text-sm cursor-pointer">Forgot password?</p>
        <button onClick={handleLogin} className="w-full mt-4 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
