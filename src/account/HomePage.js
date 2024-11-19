// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/api/users/profile', {
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      {/* Pass username and handleLogout as props */}
      <NavBar username={username} handleLogout={handleLogout} />
      <div className="homepage-content">
        <h2>Welcome to the REPREX Application, {username}!</h2>
      </div>
    </div>
  );
};

export default HomePage;
