import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="centerbox">

      <div className='loginbox'>
          <form className='form'>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>

      </div>

      <div className='registerbox'>

      </div>
      
     
    </div>
  );
};

export default Login;
