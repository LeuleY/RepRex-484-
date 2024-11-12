import React from 'react';
import { Link } from 'react-router-dom';
import '../ComponentCSS/HomePageStyles.css';

function About() {
    return (
        <div>
            {/* Header Section */}
            <header>
                <div className="logo">
                    <img src="logo.png" alt="RepRex Logo" />
                    <h1>RepRex</h1>
                </div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="#">RexLog</Link>
                    <Link to="/Community">Community</Link>
                    <Link to="/About">About</Link>
                    <Link to="#"><img src="User.png" alt="User" /></Link>
                </nav>
            </header>

            <h1>This is the about page! This will contain information about the authors</h1>
        </div>
    );
}

export default About;