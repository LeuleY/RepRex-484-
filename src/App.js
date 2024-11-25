// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './account/Login';
import Register from './account/Register';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import About from './Components/About';
import Community from './Components/Community';
import ExerciseInput from './Components/ExerciseInput';
import CardList from './Components/CardList';
import DetailsPage from './Components/DetailsPage'; 
import Calculator from './Components/Calculator'; 
import BMICalc from './Components/BMICalc'; 
import SearchBar from './Components/SearchBar';

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
      <Route path="/rexlog" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
      <Route path="/workoutInput" element={<ProtectedRoute><ExerciseInput /></ProtectedRoute>} />
      <Route path="/cards/:muscle" element={<ProtectedRoute><CardList/></ProtectedRoute>} />
      <Route path="/details/:exercise" element={<ProtectedRoute><DetailsPage/></ProtectedRoute>} />
      <Route path="/1RCalculator" element={<ProtectedRoute><Calculator/></ProtectedRoute>} />
      <Route path="/BMICalculator" element={<ProtectedRoute><BMICalc/></ProtectedRoute>} />
      <Route path="/SearchBar" element={<ProtectedRoute><SearchBar/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
