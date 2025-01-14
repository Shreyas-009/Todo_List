import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";
import toast from "react-hot-toast";

function Register({ onRegister, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onRegister(data.token, data.userId, data.name);
        toast.success("Registered successfully");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 p-8 rounded-lg">
      <h2 className="text-2xl text-white mb-6">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-zinc-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
        >
          Register
        </button>
        <button
          type="button"
          onClick={switchToLogin}
          className="w-full text-blue-400 hover:text-blue-300"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default Register;
