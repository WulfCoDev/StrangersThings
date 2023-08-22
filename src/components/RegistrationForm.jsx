import React, {useState} from 'react';

function RegistrationForm () {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const [passwordConfirmation, setPasswordConfirmation] = useState ('');

    const handleRegistration = async (e) => {
        e.preventDefault();
        
        if (password !== passwordConfirmation) {
        
          return;
        }
    
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (response.ok) {
          
            const data = await response.json();
         
          } else {
        
          }
        } catch (error) {
          console.error('Error registering:', error);
        }
      };
    
      return (
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit">Register</button>
        </form>
      );
    }
    
    export default RegistrationForm;