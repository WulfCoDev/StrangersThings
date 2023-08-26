import React from 'react';
import { logIn } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const RegistrationForm = () => {
  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(APIURL + '/users/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log (data.token);
        logIn(data.token);
      } else {
        // Handle registration error
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <input type="text" placeholder='Username' name="username" minLength="3" required />
      <input type="password" placeholder='Password' name="password" minLength="6" required />
      <input type="password" placeholder='Confirm Password' name="confirmPassword" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;