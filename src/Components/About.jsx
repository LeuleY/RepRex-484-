import React from 'react';
import '../ComponentCSS/About.css';
import NavBar from './NavBar';

const About = () => {
  return (
    <div>
      <NavBar />
    <div className="about-page">
      <div className="about-container">
        <h2 className="app-title">REXLOG</h2>
        <p className="app-description">
          RepRex is your ultimate fitness companion app, designed to help you log your fitness journey, connect with like-minded individuals, and achieve your goals.
        </p>
        <h3 className="team-heading">Meet the Team</h3>
        <div className="team-list">
          <div className="team-member">
            <h4>Riley Forney</h4>
            <p>Degree: Computer Science, Graduating: Spring 2025</p>
            <p>Role: Backend/Database Developer</p>
          </div>
          <div className="team-member">
            <h4>Leule Yonas</h4>
            <p>Degree: Computer Science</p>
            <p>Role: Web Developer</p>
          </div>
          <div className="team-member">
            <h4>Christian Bastien</h4>
            <p>Degree: Computer Science with a Track in Software Engineering</p>
            <p>Role: Front-End Design and API Management</p>
          </div>
          <div className="team-member">
            <h4>Novoa Champion</h4>
            <p>Degree: Bachelor of Science in Computer Science (Software Engineering Track), Graduating: Winter 2024</p>
            <p>Roles and Expertise:</p>
            <ul>
              <li>UI/UX Conceptualization & Design</li>
              <li>Backend Development</li>
              <li>Database Architecture</li>
            </ul>
            <p>Interests: Data Science and Web Applications</p>
          </div>
          <div className="team-member">
            <h4>Jake Dimling</h4>
            <p>Degree: Computer Science with a Track in Cybersecurity</p>
            <p>Role: Front-End Developer</p>
          </div>
          <div className="team-member">
            <h4>Richard Smith</h4>
            <p>Degree: Computer Science</p>
            <p>Role: Backend and middleware development</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
