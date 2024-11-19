// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Making a POST request using Axios
      const response = await axios.post('http://localhost:5001/api/users/register', {
        username,
        password,
        email,
      });

      // Show success message
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 2xx
        setMessage(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        // Request was made but no response received
        setMessage('No response from server');
      } else {
        // Something else happened
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div className='acctbody'>
      <div className="centerbox">
        <div className='loginbox'>
          <form className='form' onSubmit={handleRegister}>
            <h1>REGISTER</h1>

            <input
              type="text"
              placeholder="New Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" id='bttn'>Register</button>

            {message && <p style={{ color: 'red', fontSize: '14px' }} >{message}</p>}

            <a href='./'>Back to Sign in Page</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
