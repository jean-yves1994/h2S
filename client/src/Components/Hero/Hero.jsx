import React, { useState, useEffect } from 'react';
import './Hero.css';
import CenteredModal from '../Modal/Modal'; // Import the modal component
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open/close state

  // Lock the background scroll when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    }

    // Clean up the effect to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1>HEAR TO STAY</h1>
        <h2>ARIEL WAYZ</h2>
        <h3>ALBUM LAUNCH - LIVESTREAM</h3>
        <p></p>
        <button 
          className='btn'
          onClick={() => setIsModalOpen(true)} // Open modal on button click
        >
          PAY 1,000 RWF TO WATCH
        </button>
      </div>

      {/* Pass the state and setter function to CenteredModal */}
      <CenteredModal 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
      />
    </div>
  );
};

export default Hero;
