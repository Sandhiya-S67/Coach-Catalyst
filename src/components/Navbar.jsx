import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">CoachCatalyst</div>
      <ul className="navbar-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <button className="navbar-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;
