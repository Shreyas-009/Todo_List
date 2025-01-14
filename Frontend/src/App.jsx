import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (token && userId) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (authToken, id, name) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("userId", id);
    localStorage.setItem("userName", name);
    setToken(authToken);
    setUserId(id);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setToken(null);
    setUserId(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-4 px-4">
      <Toaster position="top-center" />
      {!isAuthenticated ? (
        showLogin ? (
          <Login
            onLogin={handleAuth}
            switchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            onRegister={handleAuth}
            switchToLogin={() => setShowLogin(true)}
          />
        )
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-xl text-center">
              Welcome, <span className="font-bold text-blue-500"> {userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <TaskList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
