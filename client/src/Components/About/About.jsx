import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-event-container">
      <p className="event-description">
        Join us for an exclusive online album launch event! Experience the music, the energy, 
        and special performances from the comfort of your home.
      </p>

      <h2>📅 Event Date</h2>
      <p>March 8 2025</p>

      <h2>💰 Ticket Price</h2>
      <p>1,000 RWF</p>

      <h2>📧 How to Access</h2>
      <p>
        After payment, you will receive a unique <strong>access code</strong> via email. Use this code to 
        watch the live stream.
      </p>
    </div>
  );
};

export default About;
