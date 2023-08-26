import React from 'react';
import { logIn } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const LoginForm = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(APIURL + '/api/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        logIn(data.token);
      } else {
        // Handle login error
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder='Username' name="username" required />
      <input type="password" placeholder='Password' name="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;