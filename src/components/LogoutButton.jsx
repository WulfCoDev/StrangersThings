import React from 'react';
import { logOut } from './auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/', { replace: true });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;