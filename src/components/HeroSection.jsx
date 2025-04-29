import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1>Unlock Your Best Self</h1>
        <p>CoachCatalyst empowers you to achieve your personal and professional goals with personalized coaching, habit-building, and mindset transformation.</p>
        <div className="hero-buttons">
          <button className="hero-btn primary">Get Started</button>
          <button className="hero-btn secondary">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <img 
          src="https://media.istockphoto.com/id/1131849259/photo/free-and-happy-woman-raises-arms-against-the-sunset-sky-harmony-and-balance.webp?a=1&b=1&s=612x612&w=0&k=20&c=A4VqnYJbb2LB3iAyCl1JOR1QP4-Xqr_1nCfgOGJxnus=" 
          alt="Coaching" 
        />
      </div>
    </section>
  );
};

export default HeroSection;
