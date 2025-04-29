import React from "react";
import "./Features.css";
import { FaUsers, FaChartLine, FaDesktop } from "react-icons/fa";

const Features = () => {
  return (
    <section className="features" id="features">
      <h2>Why Choose CoachCatalyst?</h2>
      <p className="features-subtitle">Unlock your full potential with AI-powered coaching and personalized growth plans.</p>
      <div className="features-grid">
        <div className="feature-card">
          <FaUsers className="feature-icon" />
          <h3>Personalized Coaching</h3>
          <p>Get tailored coaching experiences that evolve with your growth, ensuring you always stay on track.</p>
        </div>
        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Goal and Habit Tracking</h3>
          <p>Set and track your goals effortlessly while building positive habits with real-time progress insights.</p>
        </div>
        <div className="feature-card">
          <FaDesktop className="feature-icon" />
          <h3>Accessible Anytime, Anywhere</h3>
          <p>Access your personalized coaching experience from any device with an internet connection, keeping you motivated and on track from anywhere.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
