
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, } from 'react-router-dom';
import Navbar from './components/Navbar';
import Switch from './components/Routes';
import { isLoggedIn } from './components/auth';

function App() {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    // Listen for changes in authentication status and update the state
    // This assumes you have a function to check authentication status
    const checkAuthentication = () => {
      setAuthenticated(isLoggedIn());
    };

    // Add an event listener to check for authentication changes
    window.addEventListener('authChange', checkAuthentication);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('authChange', checkAuthentication);
    };
  }, []);

  return (
    <Router>
      <div>
        <Navbar authenticated={authenticated} />
        <Switch />
      </div>
    </Router>
  );
}

export default App;

