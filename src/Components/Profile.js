// Profile.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ComponentCSS/Profile.css';
import NavBar from './NavBar';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
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
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <NavBar username={userData.username} handleLogout={handleLogout} />
      <div className="profile-container">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>
        <div className="profile-info">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
        <div className="profile-actions">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )}

export default Profile;
