import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => (
  <nav
    style={{
      background: "#007bff",
      padding: "12px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      marginBottom: 32,
      borderRadius: 8,
      maxWidth: 400,
      margin: "32px auto 0 auto",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    }}
  >
    <span style={{ fontWeight: "bold", fontSize: 20 }}>To-Do App</span>
    <div>
      <Link
        to="/"
        style={{ color: "#fff", marginRight: 16, textDecoration: "none" }}
      >
        Home
      </Link>
      <button
        onClick={onLogout}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  </nav>
);

export default Navbar;
