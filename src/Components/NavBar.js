import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const NavBar = () => {


   // Logout function
   const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
};

const navigate = useNavigate();

const [username, setUsername] = useState('');


  return (
    
    <header>
    <div className="logo">
        <img src="" alt="RepRex Logo" />
        <h1>RepRex</h1>
    </div>
    <nav>
        <Link to="/HomePage">HOME</Link>
        <Link to="#">RexLog</Link>
        <Link to="/Community">Community</Link>
        <Link to="/About">About</Link>

        {/* Conditionally Render Username and Logout Button */}
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

        

        <Link to="/Profile"><img src="/homepageAssets/User.png" alt="User" /></Link>
    </nav>
</header>
  )
}

export default NavBar