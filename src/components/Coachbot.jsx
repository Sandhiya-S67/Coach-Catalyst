import React, { useState, useEffect } from "react";
import {FiArrowLeft} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { generateContent } from "./Model";
import ReactMarkdown from "react-markdown";
import "./Coachbot.css";

function Coachbot() {
  const navigate = useNavigate();

  const defaultWelcome = {
    id: Date.now(),
    title: "New Coaching Session",
    messages: [{
      text: `🌟 **Welcome to CoachCatalyst!** 🌟\n\nI'm your AI coaching companion, here to help you:\n\n` +
        `• Overcome mental roadblocks and procrastination\n` +
        `• Build consistent habits and routines\n` +
        `• Set and achieve meaningful goals\n` +
        `• Develop a growth-oriented mindset\n\n` +
        `**Where would you like to start?**\n` +
        `Try asking about:\n` +
        `- "How can I stay motivated with my fitness goals?"\n` +
        `- "Help me create a morning routine"\n` +
        `- "I'm feeling overwhelmed at work, what can I do?"`,
      sender: "bot"
    }]
  };

  const [chatHistory, setChatHistory] = useState([defaultWelcome]);
  const [activeChatId, setActiveChatId] = useState(defaultWelcome.id);
  const [input, setInput] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInput, setRenameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [quickReplies] = useState([
    "Help me set goals",
    "I'm feeling stuck",
    "Build a new habit",
    "Work-life balance tips",
    "Overcome procrastination"
  ]);

  const activeChat = chatHistory.find(chat => chat.id === activeChatId);

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      setApiStatus("Testing connection...");
      const testResponse = await generateContent("Connection test");
      if (testResponse.includes("error")) {
        throw new Error(testResponse);
      }
      setApiStatus("Connected to CoachGPT");
    } catch (error) {
      console.error("API Connection Test Failed:", error);
      setApiStatus(`Connection error: ${error.message}`);
    }
  };

  const sendMessage = async (message = null) => {
    const userMessage = message || input;
    
    if (userMessage.trim()) {
      // Add user message immediately
      const updatedChatsWithUserMessage = chatHistory.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, { text: userMessage, sender: "user" }] }
          : chat
      );
      setChatHistory(updatedChatsWithUserMessage);
      if (!message) setInput("");
      setIsLoading(true);

      try {
        const botResponse = await generateContent(userMessage, activeChat.messages);
        
        setChatHistory(prevChats =>
          prevChats.map(chat =>
            chat.id === activeChatId
              ? { ...chat, messages: [...chat.messages, { text: botResponse, sender: "bot" }] }
              : chat
          )
        );
      } catch (error) {
        console.error("Error in sendMessage:", error);
        setChatHistory(prevChats =>
          prevChats.map(chat =>
            chat.id === activeChatId
              ? { 
                  ...chat, 
                  messages: [
                    ...chat.messages, 
                    { 
                      text: `I'm having trouble processing that. Could you try rephrasing or ask me about personal growth strategies?`, 
                      sender: "bot" 
                    }
                  ] 
                }
              : chat
          )
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Session ${chatHistory.length + 1}`,
      messages: [{
        text: `🌟 **New Coaching Session Started** 🌟\n\nWhat area of your life would you like to focus on improving today?`,
        sender: "bot"
      }]
    };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id) => {
    const updatedChats = chatHistory.filter(chat => chat.id !== id);
    setChatHistory(updatedChats);
    if (id === activeChatId && updatedChats.length > 0) {
      setActiveChatId(updatedChats[0].id);
    } else if (updatedChats.length === 0) {
      startNewChat();
    }
  };

  const handleRename = () => {
    const updatedChats = chatHistory.map(chat =>
      chat.id === activeChatId ? { ...chat, title: renameInput || chat.title } : chat
    );
    setChatHistory(updatedChats);
    setIsRenaming(false);
    setRenameInput("");
  };

  return (
    <div className="coachbot-dashboard-container">
      <div className="coachbot-sidebar">
        <h2>🧭 CoachCatalyst</h2>
        <button className="new-chat-btn" onClick={startNewChat}>🌟 New Session</button>
        
        <div className="api-status" style={{ 
          color: apiStatus?.includes("error") ? "#ff6b6b" : "#51cf66",
          fontSize: "0.8rem",
          margin: "10px 0"
        }}>
          {apiStatus}
        </div>

        <div className="chat-history-list">
          {chatHistory.map(chat => (
            <div
              key={chat.id}
              className={`chat-history-item ${chat.id === activeChatId ? "active" : ""}`}
            >
              <span onClick={() => setActiveChatId(chat.id)}>
                {chat.id === activeChatId ? "▶ " : ""}
                {chat.title}
              </span>
              <div className="chat-actions">
                <span 
                  className="rename-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveChatId(chat.id);
                    setIsRenaming(true);
                    setRenameInput(chat.title);
                  }}
                >
                  ✏️
                </span>
                <span 
                  className="delete-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="go-back-btn" onClick={() => navigate("/dashboard")}>
          <FiArrowLeft /> Back to Dashboard
        </button>
      </div>

      <div className="coachbot-main">
        <div className="chat-header">
          {isRenaming ? (
            <div className="rename-form">
              <input
                type="text"
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                className="rename-input"
                placeholder="Session name..."
              />
              <button className="rename-save-btn" onClick={handleRename}>Save</button>
              <button className="rename-cancel-btn" onClick={() => setIsRenaming(false)}>Cancel</button>
            </div>
          ) : (
            <div className="chat-title">
              <span className="coach-icon">🧠</span>
              {activeChat?.title}
            </div>
          )}
        </div>

        <div className="chat-window">
          {activeChat?.messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.sender} ${msg.text.includes("error") ? "error" : ""}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button 
              key={index} 
              className="quick-reply-btn"
              onClick={() => sendMessage(reply)}
              disabled={isLoading}
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask your coach anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Coachbot;