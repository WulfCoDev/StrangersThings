import { useState } from 'react';

let token = '';

let setTokenState = (newToken) => {
  token = newToken;
  sessionStorage.setItem('token', newToken); // Store the token in sessionStorage
  window.dispatchEvent(new Event('authChange'));
};

export const logIn = (newToken) => {
  console.log('Setting token in sessionStorage:', newToken);
  token = newToken;
  sessionStorage.setItem('token', newToken);
  setTokenState(newToken);
};

export const getToken = () => {
  return token || sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
};

export const useTokenState = () => {
  [token, setTokenState] = useState(getToken()); // Initialize with the token from sessionStorage
  return [token, setTokenState];
};

export const logOut = () => {
  token = '';
  sessionStorage.removeItem('token'); // Remove the token from sessionStorage
  setTokenState('');
  window.dispatchEvent(new Event('authChange')); // Update state by calling setTokenState
};

export const isLoggedIn = () => {
  return !!getToken(); // Check if the token exists in sessionStorage
};

export const makeHeaders = () => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json'); // Required for the API
  
  const token = getToken();
  console.log('Token:', token); // Check if the token is retrieved correctly
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};


