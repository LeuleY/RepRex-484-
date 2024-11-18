import React, { useState } from 'react';
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '') {
      alert('Username cannot be blank!');
      return;
    }
    
    if (password.trim() === '') {
      alert('Password cannot be blank!');
      return;
    }

    // Validation for username
    if (username.length < 6) {
      alert('Username must be at least 6 characters!');
      return;
    } else if (username.length > 24) {
      alert('Username must be less than 24 characters!');
      return;
    }

    // Validation for password
    if (password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }

    // Proceed with registration logic
    console.log("Registered with username:", username, "and password:", password);
  };

  return (
    <div className='acctbody'> 
      <div className="centerbox">
        <div className='loginbox'>
          <form className='form' onSubmit={handleSubmit}>
            <h1>REGISTER</h1>

            <input
              type="text"
              placeholder="New Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit" id='bttn'>Register</button>
            
            <a href='./'>Back to Sign in Page</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
