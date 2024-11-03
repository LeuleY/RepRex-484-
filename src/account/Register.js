import React from 'react'
import './Login.css';


const Register = () => {
  return (

    <div className='acctbody'> 
        <div className="centerbox ">

    <div className='loginbox'>
        <form className='form'>
        <h1>REGISTER</h1>

          <input type="text" placeholder="New Username" />
          <input type="password" placeholder="New Password" />
          <button type="submit" id='bttn'>Register</button>
          
            <a href='./'>Back to Sign in Page</a>
        </form>

    </div>
   
  </div>

    </div>
      )
}

export default Register