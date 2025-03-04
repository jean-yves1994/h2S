import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WatchVideo = () => {
    const navigate = useNavigate();
    const [accessCode, setAccessCode] = useState('');

    useEffect(() => {
        // Get access code from localStorage
        const storedCode = localStorage.getItem("accessCode");

        if (!storedCode) {
            navigate('/'); // Redirect to homepage if no access code is found
        } else {
            setAccessCode(storedCode);
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Watch Video</h1>
            <video controls width="80%">
                <source src="https://d244z9d6ug64f4.cloudfront.net/Watch%20Supacell%20Season%201%20Episode%201%20-%20Michael.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default WatchVideo;
