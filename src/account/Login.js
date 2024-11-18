import React, { useState } from 'react';
import './Login.css';


const Login = () => {
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

    if (username.length < 6) {
      alert('Username must be above 6 characters!');
    } else if (username.length > 24) {
      alert('Username must be below 24 characters!');
    } else {
      // Form submission logic here
      console.log("Form submitted with username:", username, "and password:", password);
    }
  };

  return (
    <div className='acctbody'>
      <div className="centerbox">
        <div className='loginbox'>
          <form className='form' onSubmit={handleSubmit}>
            <h1>SIGN IN</h1>
            <input
              type="text"
              id='username'
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              id='password'
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit" id='bttn'>Login</button>
            <p>Don't have an account?</p>
            <a href='./register'>Register Here</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
