import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const LoginForm = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(APIURL + '/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: formData.get('username'),
            password: formData.get('password'),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        logIn(data.data.token);
        console.log('Logged in with token:', data.data.token);
        navigate('/userdashboard');
      } else {
        // Handle login error
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Username" name="username" required />
      <input type="password" placeholder="Password" name="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;