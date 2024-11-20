// About.js
import React, { useState } from 'react';
import NavBar from './NavBar';

const About = () => {
  const username = localStorage.getItem('username') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <NavBar />
      <h2>About RepRex</h2>
      <p>RepRex is your ultimate fitness companion app...</p>
    </div>
  );
};

export default About;
