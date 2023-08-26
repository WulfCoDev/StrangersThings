
import './App.css'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Switch from './components/Routes';

function App() {


  return (
    <Router>
      <div>
        <Navbar />
        <Switch />
      </div>
    </Router>
  )
}

export default App
