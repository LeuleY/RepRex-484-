import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        username,
        password,
      });

      // Save the JWT token and userId in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); // Save userId
      console.log('Token and User ID saved:', {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
      }); // Debug log

      // Redirect to the homepage if token is present
      if (localStorage.getItem('token')) {
        navigate('/homepage');
      } else {
        console.error('Token not found, unable to navigate.'); // Error log
        setMessage('Login failed: Unable to navigate');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setMessage('No response from server');
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div className='acctbody'>
      <div className="centerbox">
        <div className='loginbox'>
          <form className='form' onSubmit={handleLogin}>
            <h1>SIGN IN</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" id='bttn'>Login</button>
            {message && <p style={{ color: 'red', fontSize: '14px' }}>{message}</p>}
            <p>Don't have an account? <a href='/register'>Register Here</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
