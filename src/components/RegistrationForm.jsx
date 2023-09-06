import React from 'react';
import { logIn, makeHeaders } from './auth';
import { useNavigate } from 'react-router-dom';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const registrationData = {
      user: {
        username: formData.get('username'),
        password: formData.get('password'),
      }
    };
  
    try {
      const response = await fetch(APIURL + '/users/register', {
        method: 'POST',
        headers: makeHeaders(),
        body: JSON.stringify(registrationData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        console.log(data);
        logIn(data.token);

        navigate('/userdashboard');
      } else {
        
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='registration-form'>
    <form onSubmit={handleRegistration}>
      <input type="text" placeholder='Username' name="username" minLength="3" required />
      <input type="password" placeholder='Password' name="password" minLength="6" required />
      <input type="password" placeholder='Confirm Password' name="confirmPassword" required />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default RegistrationForm;