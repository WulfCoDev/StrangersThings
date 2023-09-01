import { useState } from 'react';

let token = '';

export const logIn = newToken => {
  token = newToken;
  sessionStorage.setItem('token', newToken);
  // Update state with the new token
  setTokenState(newToken);
};

export const getToken = () => {
  return token;
};

const useTokenState = () => {
  const [tokenState, setTokenState] = useState(
    sessionStorage.getItem('token') || ''
  );
  return [tokenState, setTokenState];
};


export const logOut = () => {
  token = '';
};


export const isLoggedIn = () => {
  return !!token;
};


export const makeHeaders = () => {
  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};