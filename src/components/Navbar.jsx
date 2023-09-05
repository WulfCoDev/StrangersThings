import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/logindashboard">Register or Login</Link>
        </li>
        <li>
          <Link to="/">Posts</Link>
        </li>
        <li>
          <Link to="/userdashboard">Profile</Link>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
};

export default Navbar;