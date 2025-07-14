import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import logoImg from "./assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Layout = () => {
  const navigate = useNavigate();

  const activeStyle = {
    borderBottom: "3px solid #d32f2f",
    paddingBottom: "4px",
    fontWeight: "bold",
  };

  const navStyle = {
    color: "rgba(255, 0, 0, 0.7)",
    textDecoration: "none",
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // proper redirect
  };

  return (
    <>
      <nav
        style={{
          height: "70px",
          backgroundColor: "white",
          color: "rgba(255, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          fontFamily: "Poppins, sans-serif",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoImg}
            alt="Logo"
            style={{
              height: "140px",
              marginRight: "20px",
              marginTop: "14px",
            }}
          />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            TrackMyBus
          </span>
        </div>
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <NavLink to="/dashboard" style={({ isActive }) => (isActive ? { ...navStyle, ...activeStyle } : navStyle)}>
            Home
          </NavLink>
          <NavLink to="/track-bus" style={({ isActive }) => (isActive ? { ...navStyle, ...activeStyle } : navStyle)}>
            Track Bus
          </NavLink>
          <NavLink to="/contact" style={({ isActive }) => (isActive ? { ...navStyle, ...activeStyle } : navStyle)}>
            Contact
          </NavLink>
          <NavLink to="/gemini" style={({ isActive }) => (isActive ? { ...navStyle, ...activeStyle } : navStyle)}>
            Ask Gemini
          </NavLink>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#d32f2f",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
