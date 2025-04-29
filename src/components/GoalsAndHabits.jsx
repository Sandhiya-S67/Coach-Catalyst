import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiCheck, 
  FiEdit2, 
  FiTrash2, 
  FiArrowLeft,
  FiX,
  FiStar,
  FiAward
} from 'react-icons/fi';
import { 
  FaFire, 
  FaWater, 
  FaHeart, 
  FaMoon, 
  FaRegCheckCircle, 
  FaRegCircle,
  FaLeaf,
  FaBrain
} from 'react-icons/fa';
import { 
  GiMeditation, 
  GiSunrise,
  GiSittingDog,
  GiBookshelf
} from 'react-icons/gi';
import { 
  BsJournalBookmarkFill, 
  BsLightbulb, 
  BsGraphUp,
  BsDroplet,
  BsEmojiSmile
} from 'react-icons/bs';
import { 
  RiFlaskLine, 
  RiMentalHealthLine,
  RiRestTimeLine
} from 'react-icons/ri';
import { IoIosFitness } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './GoalsAndHabits.css';

const GoalsAndHabits = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [habits, setHabits] = useState([
    { 
      id: 1, 
      title: 'Morning Meditation', 
      frequency: 'Daily', 
      streak: 3, 
      completed: false,
      lastCompleted: null,
      icon: 'meditation',
      color: 'purple',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      favorite: true,
      reminder: { enabled: false, time: '08:00' }
    },
    { 
      id: 2, 
      title: 'Evening Journal', 
      frequency: 'Daily', 
      streak: 5, 
      completed: false,
      lastCompleted: null,
      icon: 'journal',
      color: 'teal',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      favorite: false,
      reminder: { enabled: true, time: '20:00' }
    }
  ]);
  
  const [suggestedHabits, setSuggestedHabits] = useState([
    { id: 3, title: 'Hydration Goal', description: 'Drink 8 glasses of water', icon: 'water', color: 'blue' },
    { id: 4, title: 'Gratitude Journal', description: 'Write 3 things you\'re grateful for', icon: 'journal', color: 'teal' },
    { id: 5, title: 'Evening Reflection', description: '5 minutes of daily reflection', icon: 'lightbulb', color: 'purple' },
    { id: 6, title: 'Morning Stretch', description: '5-minute morning stretching routine', icon: 'sunrise', color: 'orange' },
    { id: 7, title: 'Self-Care Time', description: '30 minutes for yourself', icon: 'heart', color: 'pink' },
    { id: 8, title: 'Quality Sleep', description: '7-9 hours of sleep', icon: 'sleep', color: 'indigo' },
    { id: 9, title: 'Learning Time', description: 'Learn something new for 15 mins', icon: 'flask', color: 'yellow' },
    { id: 10, title: 'Mindfulness', description: 'Practice mindfulness for 10 mins', icon: 'mental', color: 'green' },
    { id: 11, title: 'Nature Time', description: 'Spend 20 mins in nature', icon: 'leaf', color: 'green' },
    { id: 12, title: 'Digital Detox', description: '1 hour without screens', icon: 'rest', color: 'blue' },
    { id: 13, title: 'Fitness', description: '30 minutes of exercise', icon: 'fitness', color: 'red' },
    { id: 14, title: 'Reading', description: 'Read 10 pages daily', icon: 'books', color: 'brown' }
  ]);
  
  const [editingHabit, setEditingHabit] = useState(null);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState('Daily');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [showStreakDetails, setShowStreakDetails] = useState(null);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [newHabitReminder, setNewHabitReminder] = useState({ enabled: false, time: '08:00' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const quotes = [
    "Small steps lead to big changes.",
    "Consistency is the key to mastery.",
    "You're capable of amazing things.",
    "Progress, not perfection.",
    "Every day is a fresh start.",
    "Your habits shape your future.",
    "Celebrate small victories."
  ];

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }));
    
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) setHabits(JSON.parse(savedHabits));
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const getIconComponent = (iconName, size = 20) => {
    const icons = {
      meditation: <GiMeditation size={size} />,
      journal: <BsJournalBookmarkFill size={size} />,
      water: <BsDroplet size={size} />,
      lightbulb: <BsLightbulb size={size} />,
      sunrise: <GiSunrise size={size} />,
      heart: <FaHeart size={size} />,
      sleep: <FaMoon size={size} />,
      flask: <RiFlaskLine size={size} />,
      mental: <RiMentalHealthLine size={size} />,
      leaf: <FaLeaf size={size} />,
      rest: <RiRestTimeLine size={size} />,
      fitness: <IoIosFitness size={size} />,
      books: <GiBookshelf size={size} />,
      smile: <BsEmojiSmile size={size} />,
      brain: <FaBrain size={size} />
    };
    return icons[iconName] || <FiPlus size={size} />;
  };

  const handleComplete = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        let newStreak = habit.streak;
        
        if (habit.lastCompleted === yesterday || habit.lastCompleted !== today) {
          newStreak = habit.lastCompleted === yesterday ? habit.streak + 1 : 1;
        }

        return {
          ...habit,
          streak: newStreak,
          completed: true,
          lastCompleted: today
        };
      }
      return habit;
    }));
  };

  const handleReset = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: false } : habit
    ));
  };

  const handleRemove = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
    setShowConfirmation(null);
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setNewHabitTitle(habit.title);
    setNewHabitFrequency(habit.frequency);
    setNewHabitReminder(habit.reminder || { enabled: false, time: '08:00' });
  };

  const saveEdit = () => {
    setHabits(habits.map(habit => 
      habit.id === editingHabit.id 
        ? { 
            ...habit, 
            title: newHabitTitle, 
            frequency: newHabitFrequency,
            reminder: newHabitReminder
          } 
        : habit
    ));
    setEditingHabit(null);
  };

  const toggleFavorite = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, favorite: !habit.favorite } : habit
    ));
  };

  const toggleReminder = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            reminder: { 
              enabled: !habit.reminder?.enabled, 
              time: habit.reminder?.time || '08:00' 
            } 
          } 
        : habit
    ));
  };

  const addSuggestedHabit = (habit) => {
    setHabits([...habits, {
      id: Date.now(),
      title: habit.title,
      frequency: 'Daily',
      streak: 0,
      completed: false,
      lastCompleted: null,
      icon: habit.icon,
      color: habit.color,
      createdAt: new Date(),
      favorite: false,
      reminder: { enabled: false, time: '08:00' }
    }]);
  };

  const addNewHabit = () => {
    if (newHabitTitle.trim()) {
      const colors = ['purple', 'teal', 'green', 'blue', 'pink', 'indigo', 'orange', 'yellow'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setHabits([...habits, {
        id: Date.now(),
        title: newHabitTitle,
        frequency: newHabitFrequency,
        streak: 0,
        completed: false,
        lastCompleted: null,
        icon: 'journal',
        color: randomColor,
        createdAt: new Date(),
        favorite: false,
        reminder: newHabitReminder
      }]);
      setNewHabitTitle('');
      setNewHabitFrequency('Daily');
      setNewHabitReminder({ enabled: false, time: '08:00' });
      setShowAddForm(false);
    }
  };

  const renderStreakDetails = (habit) => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return (
      <motion.div 
        className="streak-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="streak-header">
          <h4>Weekly Completion</h4>
          <button onClick={() => setShowStreakDetails(null)} className="close-streak">
            <FiX />
          </button>
        </div>
        <div className="streak-calendar">
          {days.map((day, index) => (
            <div key={index} className="streak-day">
              <div className="day-name">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</div>
              <div className={`day-status ${habit.lastCompleted === day ? 'completed' : ''}`}>
                {habit.lastCompleted === day ? <FaRegCheckCircle /> : <FaRegCircle />}
              </div>
            </div>
          ))}
        </div>
        <div className="streak-stats">
          <div className="stat-item">
            <span className="stat-value">{habit.streak}</span>
            <span className="stat-label">Current Streak</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{Math.floor((habit.streak / 7) * 100)}%</span>
            <span className="stat-label">Weekly</span>
          </div>
          {habit.streak > 3 && (
            <div className="stat-item">
              <span className="stat-value"><FiAward /></span>
              <span className="stat-label">On Fire!</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const filteredHabits = habits
    .filter(habit => {
      if (activeTab === 'Active') return !habit.completed;
      if (activeTab === 'Completed') return habit.completed;
      if (activeTab === 'Streaks') return habit.streak > 0;
      if (activeTab === 'Favorites') return habit.favorite;
      return true;
    })
    .filter(habit => 
      habit.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.favorite !== b.favorite) return b.favorite - a.favorite;
      if (a.streak !== b.streak) return b.streak - a.streak;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const calculateAnalytics = () => {
    const totalHabits = habits.length;
    const completedToday = habits.filter(h => h.completed).length;
    const longestStreak = Math.max(...habits.map(h => h.streak), 0);
    const favoriteHabits = habits.filter(h => h.favorite).length;
    const completionRate = totalHabits > 0 
      ? Math.round((completedToday / totalHabits) * 100) 
      : 0;

    return {
      totalHabits,
      completedToday,
      longestStreak,
      favoriteHabits,
      completionRate
    };
  };

  const analytics = calculateAnalytics();

  return (
    <div className="goals-app">
      <div className="main-container">
        <div className="header-section">
          <Link to="/dashboard" className="back-to-dashboard">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <h1>{currentDate}</h1>
          
          <motion.div 
            className="reflection-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Today's Reflection</h2>
            <p>{motivationalQuote}</p>
            <div className="quote-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
            </div>
          </motion.div>
        </div>

        <div className="habits-section">
          <div className="section-header">
            <div className="header-row">
              <h1>Goals & Habits</h1>
              <button 
                className="analytics-button"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </button>
            </div>
            
            <div className="controls-row">
              <div className="tabs">
                {['Active', 'Completed', 'Streaks', 'Favorites'].map(tab => (
                  <motion.button
                    key={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
              
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search habits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {showAnalytics && (
            <motion.div 
              className="analytics-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="analytics-card">
                <div className="analytics-icon">
                  <BsGraphUp size={24} />
                </div>
                <div className="analytics-content">
                  <h4>Total Habits</h4>
                  <p>{analytics.totalHabits}</p>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FiCheck size={24} />
                </div>
                <div className="analytics-content">
                  <h4>Completed Today</h4>
                  <p>{analytics.completedToday} ({analytics.completionRate}%)</p>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FaFire size={24} />
                </div>
                <div className="analytics-content">
                  <h4>Longest Streak</h4>
                  <p>{analytics.longestStreak} days</p>
                </div>
              </div>
              
              <div className="analytics-card">
                <div className="analytics-icon">
                  <FiStar size={24} />
                </div>
                <div className="analytics-content">
                  <h4>Favorite Habits</h4>
                  <p>{analytics.favoriteHabits}</p>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {filteredHabits.length > 0 ? (
              <motion.div 
                className="habits-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredHabits.map(habit => (
                  <motion.div 
                    key={habit.id}
                    className={`habit-card ${habit.color}-bg`}
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="habit-icon">
                      {getIconComponent(habit.icon, 24)}
                    </div>
                    <div className="habit-content">
                      <div className="habit-header">
                        <h3>{habit.title}</h3>
                        <div className="habit-actions-top">
                          <button 
                            onClick={() => toggleFavorite(habit.id)}
                            className={habit.favorite ? 'favorite' : ''}
                          >
                            <FiStar />
                          </button>
                          <span className="frequency">{habit.frequency}</span>
                        </div>
                      </div>
                      
                      <div className="habit-details">
                        <div 
                          className="streak-display" 
                          onClick={() => setShowStreakDetails(habit.id)}
                        >
                          <FaFire /> {habit.streak} day streak
                        </div>
                        
                        {habit.reminder?.enabled && (
                          <div className="reminder-display">
                            <FaMoon /> Reminder at {habit.reminder.time}
                          </div>
                        )}
                      </div>
                      
                      <div className="habit-actions">
                        {!habit.completed ? (
                          <motion.button 
                            onClick={() => handleComplete(habit.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="complete-button"
                          >
                            <FiCheck /> Complete
                          </motion.button>
                        ) : (
                          <motion.button 
                            onClick={() => handleReset(habit.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="reset-button"
                          >
                            <FiCheck /> Reset
                          </motion.button>
                        )}
                        
                        <motion.button 
                          onClick={() => toggleReminder(habit.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`reminder-button ${habit.reminder?.enabled ? 'active' : ''}`}
                        >
                          <FaMoon />
                        </motion.button>
                        
                        <motion.button 
                          onClick={() => handleEdit(habit)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="edit-button"
                        >
                          <FiEdit2 />
                        </motion.button>
                        
                        <motion.button 
                          onClick={() => setShowConfirmation(habit.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="delete-button"
                        >
                          <FiTrash2 />
                        </motion.button>
                      </div>
                    </div>
                    
                    {showStreakDetails === habit.id && renderStreakDetails(habit)}
                    
                    {showConfirmation === habit.id && (
                      <motion.div 
                        className="confirmation-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p>Delete this habit?</p>
                        <div className="confirmation-buttons">
                          <button onClick={() => setShowConfirmation(null)}>Cancel</button>
                          <button onClick={() => handleRemove(habit.id)}>Delete</button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="empty-illustration">
                  <GiSittingDog size={60} />
                </div>
                <p>No {activeTab.toLowerCase()} habits yet.</p>
                <motion.button 
                  onClick={() => setShowAddForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="add-first-habit"
                >
                  Add Your First Habit
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="suggested-habits">
            <h2>Suggested Habits</h2>
            <div className="suggestions-grid">
              {suggestedHabits.map(habit => (
                <motion.div 
                  key={habit.id}
                  className={`suggested-card ${habit.color}-bg`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="suggested-icon">
                    {getIconComponent(habit.icon, 20)}
                  </div>
                  <div className="suggested-content">
                    <h4>{habit.title}</h4>
                    <p>{habit.description}</p>
                  </div>
                  <motion.button 
                    onClick={() => addSuggestedHabit(habit)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="add-suggested-button"
                  >
                    <FiPlus />
                  </motion.button>
                </motion.div>
              ))}
              <motion.div 
                className="add-new-card" 
                onClick={() => setShowAddForm(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiPlus /> Add New Habit
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {showAddForm && (
              <motion.div 
                className="add-habit-form-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="add-habit-form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="form-header">
                    <h3>Create New Habit</h3>
                    <button onClick={() => setShowAddForm(false)}>
                      <FiX />
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Habit Name</label>
                    <input
                      type="text"
                      value={newHabitTitle}
                      onChange={(e) => setNewHabitTitle(e.target.value)}
                      placeholder="Enter habit name..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Frequency</label>
                    <select
                      value={newHabitFrequency}
                      onChange={(e) => setNewHabitFrequency(e.target.value)}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={newHabitReminder.enabled}
                        onChange={(e) => setNewHabitReminder({
                          ...newHabitReminder,
                          enabled: e.target.checked
                        })}
                      />
                      Set Reminder
                    </label>
                    {newHabitReminder.enabled && (
                      <input
                        type="time"
                        value={newHabitReminder.time}
                        onChange={(e) => setNewHabitReminder({
                          ...newHabitReminder,
                          time: e.target.value
                        })}
                        className="time-input"
                      />
                    )}
                  </div>
                  <div className="form-actions">
                    <motion.button 
                      onClick={() => setShowAddForm(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cancel-button"
                    >
                      Cancel
                    </motion.button>
                    <motion.button 
                      onClick={addNewHabit} 
                      disabled={!newHabitTitle.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="add-button"
                    >
                      Add Habit
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {editingHabit && (
            <motion.div 
              className="edit-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingHabit(null)}
            >
              <motion.div 
                className="edit-modal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>Edit Habit</h3>
                  <button onClick={() => setEditingHabit(null)}>
                    <FiX />
                  </button>
                </div>
                <div className="form-group">
                  <label>Habit Name</label>
                  <input
                    type="text"
                    value={newHabitTitle}
                    onChange={(e) => setNewHabitTitle(e.target.value)}
                    placeholder="Habit title"
                  />
                </div>
                <div className="form-group">
                  <label>Frequency</label>
                  <select
                    value={newHabitFrequency}
                    onChange={(e) => setNewHabitFrequency(e.target.value)}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newHabitReminder.enabled}
                      onChange={(e) => setNewHabitReminder({
                        ...newHabitReminder,
                        enabled: e.target.checked
                      })}
                    />
                    Set Reminder
                  </label>
                  {newHabitReminder.enabled && (
                    <input
                      type="time"
                      value={newHabitReminder.time}
                      onChange={(e) => setNewHabitReminder({
                        ...newHabitReminder,
                        time: e.target.value
                      })}
                      className="time-input"
                    />
                  )}
                </div>
                <div className="modal-actions">
                  <motion.button 
                    onClick={() => setEditingHabit(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cancel-button"
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    onClick={saveEdit} 
                    disabled={!newHabitTitle.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="save-button"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GoalsAndHabits;