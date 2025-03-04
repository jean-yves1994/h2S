import React, { useState } from 'react';
import './ContactUs.css';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';

const ContactUs = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "bbe74083-bb69-4e07-9257-6dc0245cd6cb");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Email sent successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }

    setTimeout(() => {
      setResult("");
    }, 2500); // Hide message after 2.5 seconds
  };

  return (
    <div className='contact-container'>
      <div className="contact-col">
        <h3>Send us a message</h3>
        <p>Feel free to reach out through the contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our users.</p>
        <ul>
          <li><img src={mail_icon} alt="Mail Icon" /> example@gmail.com</li>
          <li><img src={phone_icon} alt="Phone Icon" /> +250 782 3677 82</li>
          <li><img src={location_icon} alt="Location Icon" /> KN 772 Str, Kigali<br /> KG 02265, Rwanda</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your name</label>
          <input type="text" name='name' placeholder='Enter your name' required />
          <label>Phone</label>
          <input type="tel" name='phone' placeholder='Enter your phone number' required />
          <label>Write your message here</label>
          <textarea name='message' rows="5" placeholder='Enter your message' required></textarea>
          <button type='submit' className='btn dark-btn'>Send Message</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
}

export default ContactUs;
