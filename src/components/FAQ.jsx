import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is CoachCatalyst?",
    answer: "CoachCatalyst is an AI-powered life coaching platform designed to help individuals track their personal growth, set and achieve goals, and improve their mental well-being with the help of AI-based insights and progress tracking."
  },
  {
    question: "Is there a free trial available?",
    answer: "CoachCatalyst is completely free to use! No trials, no hidden costs—just personal growth tools available at your fingertips."
  },
  {
    question: "Are there any subscriptions or plans?",
    answer: "No, CoachCatalyst is entirely free! You can access all features without any subscriptions, plans, or hidden fees."
  },
  {
    question: "How does the AI coaching work?",
    answer: "Our AI-powered coach, CoachGPT, provides personalized reflections, goal-setting advice, and motivational tips based on your progress and daily check-ins. It learns from your responses to offer tailored guidance."
  },
  {
    question: "Can I track my mental well-being?",
    answer: "Yes! CoachCatalyst allows you to log daily mood check-ins and track emotional trends over time. The platform provides insights into your emotional journey to help you better understand your mental well-being."
  },
  {
    question: "Can I set and track personal goals?",
    answer: "Definitely! You can create, edit, and track progress on personal goals. CoachCatalyst uses visual progress bars and streaks to help keep you motivated and consistent in achieving your goals."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="arrow">{activeIndex === index ? "−" : "+"}</span>
            </div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
