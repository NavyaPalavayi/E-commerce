import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Footer from "./Footer";

function Dashboard({ onLogout }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Sidebar Section */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-3">
          <Sidebar onLogout={onLogout} />
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10 bg-light p-4 overflow-auto">
          <Outlet />
        </div>
        {/* Footer always stays at bottom */}
        <Footer />
      </div>
    </div>
    
  );
}

export default Dashboard;

