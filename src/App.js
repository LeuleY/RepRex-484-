
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './ComponentCSS/App.css';
import Login from './account/Login'
import Register from './account/Register'
import CardList from './Components/CardList';
import DetailsPage from './Components/DetailsPage';
import VideoList from './Components/VideoList';
import Calculator from './Components/Calculator'
import About from './Components/About';
import Community from './Components/Community';
import HomePage from './Components/HomePage';




function App() {
  return (
    <div >
   
        {/* <Routes>
          <Route index element={<Login/>}/> 
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/details/:exercise/' element={<DetailsPage/>}/>
          <Route path='/cards' element={<CardList/>}/>
        </Routes> */}
   
   
   <HomePage></HomePage>
   {/* <Calculator></Calculator> */}
 



    </div>
  );
}

export default App;
