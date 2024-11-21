import Login from "./account/Login";
import Register from "./account/Register";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">

            {/* <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link>
      </nav> */}

        

            <Router>
           
              <Routes>
                <Route path="/" element={ <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/homepage" element={<HomePage />} />


              </Routes>

          
            
          </Router>
            

    </div>
  );
}

export default App;