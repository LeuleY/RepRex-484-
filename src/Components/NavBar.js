import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import '../ComponentCSS/NavBar.css';
import axios from 'axios';

 


const NavBar = () => {


   // Logout function
   const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
};

const navigate = useNavigate();

const [username, setUsername] = useState('');

// Fetch user profile on component mount
useEffect(() => {
  const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
          navigate('/');
          return;
      }

      try {
          const response = await axios.get('https://reprex-484.onrender.com/api/users/profile', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setUsername(response.data.username);
      } catch (error) {
          console.error('Error fetching profile:', error);
          navigate('/');
      }
  };

  fetchUserProfile();
}, [navigate]);



  return (
    
    <header>
    <div className="logo">
        <img id='mainLogo' src="/homepageAssets/RepRexLogo.png" alt="RepRex Logo" />
    </div>
    
    <nav>
        <Link to="/HomePage">Home</Link>
        <Link to="/RexLog">RexLog</Link>
        <Link to="/Community">Community</Link>
        <Link to="/About">About</Link>

        {/* Conditionally Render Username and Logout Button */}
        {username ? (
        <>
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