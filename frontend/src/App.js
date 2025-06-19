import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <div style={{ textAlign: "right", maxWidth: 400, margin: "0 auto" }}>
        <button
          onClick={() => setDarkMode((d) => !d)}
          style={{
            margin: 8,
            padding: "4px 12px",
            borderRadius: 6,
            border: "1px solid #444",
            background: darkMode ? "#222" : "#eee",
            color: darkMode ? "#fff" : "#222",
            cursor: "pointer",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </Router>
  );
}

export default App;
