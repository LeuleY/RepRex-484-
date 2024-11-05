
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './ComponentCSS/App.css';
import CardList from './Components/CardList';
import './ComponentCSS/Cards.css'


function App() {
  return (
    <div className="App">


      {/* <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router> */}


{/* NOTE CARDLIST WILL NOT WORK BY ITSELF YOU MUST GET AN API KEY FROM API NINJA */}
      <CardList></CardList> 


    </div>
  );
}

export default App;
