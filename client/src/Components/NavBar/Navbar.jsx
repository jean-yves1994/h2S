import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import menu_icon from '../../assets/menu-icon.png';
import { Link } from 'react-scroll';

function Navbar() {
        const [accessCode, setAccessCode] = useState('');
        const [error, setError] = useState('');
        const [menu, setMenu] = useState(false);
        const [modalOpen, setModalOpen] = useState(false);
        const navigate = useNavigate();

        const toggleMenu = () => {
                setMenu(!menu);
        };

        const openModal = () => {
                setModalOpen(true);
        };

        const closeModal = () => {
                setModalOpen(false);
        };

        const handleAccessCodeSubmit = async (e) => {
                e.preventDefault();
                setError(""); // Reset error message
            
                try {
                    const response = await fetch('http://localhost:5000/api/validate-access', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ accessCode }),
                    });
            
                    const data = await response.json();
            
                    if (!response.ok) {
                        throw new Error(data.error || "Failed to validate access code");
                    }
            
                    // Save access code to localStorage to persist it
                    localStorage.setItem("accessCode", accessCode);
            
                    navigate('/watch-h2s-live'); // Redirect on success
                } catch (error) {
                    setError(error.message || 'Something went wrong. Try again.');
                }
            };

        return (
                <>
                        <nav className='container'>
                                <img src={logo} alt="" className='logo' />
                                <ul className={menu ? '' : 'hide-mobile-menu'}>
                                        <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
                                        <li><Link to='about-event-container' smooth={true} offset={-110} duration={500}>About</Link></li>
                                        <li>
                                                <button 
                                                        className='btn' 
                                                        style={{ color: 'red', transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'pointer' }}
                                                        onMouseEnter={(e) => e.target.style.color = 'white'}
                                                        onMouseLeave={(e) => e.target.style.color = 'red'}
                                                        onClick={openModal}
                                                >
                                                        Watch Live
                                                </button>
                                        </li>
                                </ul>
                                <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
                        </nav>

                        {modalOpen && (
                                <div className='modal-overlay' onClick={closeModal}>
                                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                                                <h2>Watch Live</h2>
                                                <p>Please enter your access code to continue.</p>
                                                <form onSubmit={handleAccessCodeSubmit}>
                                                        <input 
                                                                type='text' 
                                                                placeholder='Enter access code' 
                                                                className='modal-input' 
                                                                value={accessCode}
                                                                onChange={(e) => setAccessCode(e.target.value)}
                                                        />
                                                        {error && <p className='error-message'>{error}</p>}
                                                        <div className='modal-buttons'>
                                                                <button type='button' onClick={closeModal} className='modal-close-btn'>Cancel</button>
                                                                <button type='submit' className='modal-confirm-btn'>Submit</button>
                                                        </div>
                                                </form>
                                        </div>
                                </div>
                        )}
                </>
        );
}

export default Navbar;
