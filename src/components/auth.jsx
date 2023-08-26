let token = '';


export const logIn = newToken => {
  token = newToken;
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