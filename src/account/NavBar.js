// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ username, handleLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/Community">Community</Link>

      {/* Conditionally Render RexLog and User Info Based on Login Status */}
      {username ? (
        <>
          <Link to="#">RexLog</Link>
          <span className="username-display">Hello, {username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/register">Register</Link>
      )}

      {/* User Icon */}
      <Link to="/profile">
        <img src="/homepageAssets/User.png" alt="User" className="user-icon" />
      </Link>
    </nav>
  );
};

export default NavBar;
