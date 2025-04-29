import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Coachbot from "./components/Coachbot";
import GoalsAndHabits from "./components/GoalsAndHabits";

const LandingPage = () => (
  <>
    <Navbar />
    <HeroSection />
    <Features />
    <Testimonials />
    <FAQ />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coachbot" element={<Coachbot />} />
        <Route path="/goals-habits" element={<GoalsAndHabits />} />
      </Routes>
    </Router>
  );
};

export default App;