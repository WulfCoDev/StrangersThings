import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from './auth';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className="navbar-list">
      <div className='logo'><h1>Strangers Things</h1></div>
        <li className="navbar-item">
          <Link className="profile-link" to="/">Posts</Link>
        </li>
        <li className="navbar-item">
          {isLoggedIn() ? (
            <>
              <Link className="profile-link" to="/userdashboard">Profile</Link>
            </>
          ) : (
            <Link className="profile-link" to="/logindashboard">Register</Link>
          )}
        </li>
        <li>
        {isLoggedIn() ? (
            <>
              <LogoutButton />
            </>
          ) : (<Link className="profile-link" to="/logindashboard">Login</Link>)}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
