import Login from "./account/Login";
import Register from "./account/Register";

import NavBar from './NavBar'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
        

            <Router>
            <div className="Pages">
              <Routes>
                <Route path="/" element={ <Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
            

    </div>
  );
}

export default App;
