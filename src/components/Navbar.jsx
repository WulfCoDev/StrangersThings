import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Register or Login</Link>
        </li>
        <li>
          <Link to="/postsview">Posts</Link>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
};

export default Navbar;