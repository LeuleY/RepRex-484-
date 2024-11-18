// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './account/Login';
import Register from './account/Register';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import About from './Components/About';
import Community from './Components/Community';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Login />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
