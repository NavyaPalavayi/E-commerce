import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar({ onLogout }) {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-dark text-white">
      {/* Navigation Links */}
      <nav className="nav flex-column">
        <NavLink
          to="/"
          className="nav-link text-white mb-2"
          activeclassname="active"
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/products"
          className="nav-link text-white mb-2"
          activeclassname="active"
        >
          📦 Products
        </NavLink>

        <NavLink
          to="/orders"
          className="nav-link text-white mb-2"
          activeclassname="active"
        >
          🛒 Orders
        </NavLink>

        {/* ✅ Logout placed directly after Orders */}
        <button
          className="btn btn-danger w-100 mt-2"
          onClick={onLogout}
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
