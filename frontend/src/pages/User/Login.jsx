import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // from AuthContext

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    fetch("http://localhost:8080/api/user/login", { // <-- Update the route to /api/user/login
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then((data) => {
        login(data); // Save user globally
        const role = data.role?.toLowerCase();

        if (role === "admin") {
          navigate("/admin/home");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        alert("Invalid email or password.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        <input
          type="email"
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

        <p className="text-blue-600 mt-2 text-sm cursor-pointer hover:underline">
          Forgot password?
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-4 bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
