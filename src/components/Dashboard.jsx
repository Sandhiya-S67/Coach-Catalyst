import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [mood, setMood] = useState('');
  const [reflection, setReflection] = useState('');

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleReflectionSubmit = (e) => {
    e.preventDefault();
    console.log('Reflection submitted:', reflection);
    setReflection('');
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-pic">
            <img src="https://ui-avatars.com/api/?name=John+Doe&background=6d5acf&color=fff" alt="Profile" />
          </div>
          <h3 className="profile-name">John Doe</h3>
          <p className="profile-title">Mindfulness Practitioner</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <span>📅</span> Today's Review
            </li>
            <li>
              <Link to="/coachbot" className="coachbot-link">
                <span>🧠</span> Coachbot
              </Link>
            </li>
            <li>
              <Link to="/goals-habits" className="goals-habits">
                <span>🎯</span> Goals & Habits
              </Link>
            </li>
            <li>
              <span>📊</span> Coach Summary
            </li>
            <li>
              <span>⚡</span> Quick Stats
            </li>
            <li>
              <span>📈</span> Progress
            </li>
            <li>
              <span>⚙️</span> Settings
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <span>🚪</span> Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Daily Check-in</h1>
          
          <div className="mood-section">
            <h2>How are you feeling today?</h2>
            <div className="mood-options">
              {['😊', '😢', '😠', '😴', '😍'].map((emoji) => (
                <button
                  key={emoji}
                  className={`mood-btn ${mood === emoji ? 'selected' : ''}`}
                  onClick={() => setMood(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="reflection-section1">
            <h3>Today's Reflection</h3>
            <p className="coach-label">From CoachGPT</p>
            <div className="reflection-box">
              <p className="coach-message1">
                Remember, small steps lead to big changes. Your consistency in meditation practice is showing great results. Consider adding a short evening reflection to enhance your mindfulness journey.
              </p>
            </div>
            <form onSubmit={handleReflectionSubmit} className="reflection-form">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your thoughts here..."
                className="reflection-input"
              />
              <button type="submit" className="submit-btn">Save Reflection</button>
            </form>
          </div>

          <div className="divider"></div>

          <div className="stats-section">
            <div className="streak-container">
              <h3>Current Streak</h3>
              <div className="dashboard-streak-display">
                <div className="streak-number">12</div>
                <div className="streak-label">Days</div>
              </div>
            </div>

            <div className="mood-trend">
              <h3>Mood Trend</h3>
              <div className="trend-item">
                <span className="trend-label">Goal Consistency</span>
                <span className="trend-value">87% <span className="trend-up">↑ 12%</span></span>
              </div>
              <div className="dashboard-progress-bar">
                <div className="progress-fill" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;