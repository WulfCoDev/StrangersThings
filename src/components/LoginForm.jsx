import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from './auth';


const LoginForm = () => {
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
        console.log(data);
        logIn(data.token);
      } else {
        
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