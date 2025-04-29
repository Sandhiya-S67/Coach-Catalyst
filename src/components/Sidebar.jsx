// Sidebar.jsx
import React from "react";
import { FaHome, FaChartPie, FaBolt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="profile">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
        <h3>Hi Alex 👋</h3>
      </div>
      <nav className="nav-links">
        <button className="active"><FaHome /> Today’s Overview</button>
        <button><FaChartPie /> Coach Summary</button>
        <button><FaBolt /> Quick Stats</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
