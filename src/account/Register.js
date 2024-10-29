import React from 'react'
import './Login.css';


const Register = () => {
  return (
    <div className="centerbox">

    <div className='loginbox'>
        <form className='form'>
        <h1>REGISTER</h1>

          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit" id='bttn'>Login</button>
        </form>

    </div>
   
  </div>  )
}

export default Register