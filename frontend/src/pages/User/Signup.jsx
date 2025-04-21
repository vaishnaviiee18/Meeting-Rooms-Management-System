import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("Club representative");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [club, setClub] = useState("Club A");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || (role === "Club representative" && !club)) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      email,
      password,
      role,
      club: role === "Club representative" ? club : null,
    };

    try {
      const res = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`${role} account created!`);
        navigate("/login");
      } else {
        const data = await res.json();
        alert(`Signup failed: ${data.message || "Please try again."}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

        <label className="block text-gray-700">Sign up as</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mt-1 border rounded bg-yellow-100"
        >
          <option>Admin</option>
          <option>Club representative</option>
        </select>

        <input
          type="email"
          className="w-full p-2 mt-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mt-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {role === "Club representative" && (
          <div className="mt-2">
            <label className="block text-gray-700">Select your club</label>
            <select
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-yellow-100"
            >
              <option>Club A</option>
              <option>Club B</option>
              <option>Club C</option>
            </select>
          </div>
        )}

        <button
          onClick={handleSignup}
          className="w-full mt-4 bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
