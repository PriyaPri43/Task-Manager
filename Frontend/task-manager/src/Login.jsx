import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!password.trim()) {
      alert("Password is required");
      return;
    }

    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        <input
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;