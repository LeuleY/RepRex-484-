import React from 'react';
import './Login.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



const Login = () => {
  return (
    <div className='acctbody'>
        <div className="centerbox">

    

      <div className='loginbox'>
          <form className='form'>
          <h1>SIGN IN</h1>

            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit" id='bttn'>Login</button>
            <p>Dont have an account? </p>
            <a href='./register'>Register Here</a>

          </form>
      </div>

    </div>


    </div>
    
  
  );
};

export default Login;
