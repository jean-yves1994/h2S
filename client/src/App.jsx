import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Hero from './Components/Hero/Hero';
import Title from './Components/Title/Title';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import WatchVideo from './Components/video/WatchVideo';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for Main Website */}
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <div className="container">
              <Title subtitle='About Event' />
            </div>
            <About />
            <Footer />
          </>
        } />

        {/* Route for the Watch Video page (Standalone) */}
        <Route path="/watch-h2s-live" element={<WatchVideo />} />
      </Routes>
    </Router>
  ); 
}

export default App;
