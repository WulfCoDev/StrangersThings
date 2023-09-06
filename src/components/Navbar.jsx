import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from './auth';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          {isLoggedIn() ? (
            <>
              <LogoutButton /> 
              <Link to="/userdashboard">Profile</Link>
            </>
          ) : (
            <Link to="/logindashboard">Register or Login</Link>
          )}
        </li>
        <li>
          <Link to="/">Posts</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;