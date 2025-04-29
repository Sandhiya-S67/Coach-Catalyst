import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Anna Roberts",
    title: "College Student",
    text: "CoachCatalyst helped me stay on track with my studies. The daily check-ins and progress tracking have made a huge difference in managing my time and avoiding procrastination.",
    image: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    name: "John Miller",
    title: "Young Professional",
    text: "As someone just starting in my career, I struggled with maintaining motivation. CoachCatalyst's goal setting and habit tracking made me more disciplined, and I'm finally seeing results.",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Rachel Green",
    title: "Entrepreneur",
    text: "The AI-powered coaching really pushed me to break my mental barriers. The mindset reflections and emotional check-ins helped me stay resilient and motivated to grow my business.",
    image: "https://randomuser.me/api/portraits/women/37.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <h2>What Our Users Say</h2>
      <p className="testimonials-subtitle">Real transformations. Real growth. One goal at a time.</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <p className="testimonial-text">“{testimonial.text}”</p>
            <h4>{testimonial.name}</h4>
            <span className="testimonial-title">{testimonial.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
