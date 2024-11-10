import Login from "./Login";
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './ComponentCSS/App.css';
import Login from './account/Login'
import Register from './account/Register'
import CardList from './Components/CardList';
import DetailsPage from './Components/DetailsPage';
import './ComponentCSS/Cards.css'

import './App.css';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/> 
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/details/:exercise/' element={<DetailsPage/>}/>
          <Route path='/cards' element={<CardList/>}/>

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
