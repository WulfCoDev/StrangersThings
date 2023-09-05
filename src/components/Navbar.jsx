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
              <LogoutButton /> {/* Display the LogoutButton component */}
              <Link to="/userdashboard">Profile</Link> {/* Display "Profile" link when logged in */}
            </>
          ) : (
            <Link to="/logindashboard">Register or Login</Link>
          )}
        </li>
        <li>
          <Link to="/">Posts</Link>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
};

export default Navbar;