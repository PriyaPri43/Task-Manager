import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    // Basic frontend validation
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Enter valid email address");
      return;
    }

    if (!form.password.trim()) {
      alert("Password is required");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const res = await API.post("/auth/register", form);

    alert(res.data.message);
    navigate("/login");

  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};



  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full p-3 mb-4 border rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white p-3 rounded cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;