import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const Dashboard = () => {
  return (
    <div>
      <h1>Registration</h1>
      <RegistrationForm />

      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default Dashboard;