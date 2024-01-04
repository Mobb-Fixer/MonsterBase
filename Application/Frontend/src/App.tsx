import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home/Index';
import Juice from './Pages/Juice/Index'
import Add from './Pages/Add/Index';
import Store from './Pages/Store/Index';



function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Store' element={<Store />} />
          <Route path='/Store/:id' element={<Juice />} />
          <Route path='/Add' element={<Add />} />     
          <Route path='/Add/:id' element={<Add />} /> 
        </Routes>
       </Router>
    </div>
  );
}

export default App;
