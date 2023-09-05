import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostsView from './PostsView';
import LoginDashboard from './LoginDashboard';
import UserDashboard from './UserDashboard';
import AuthPostsView from './AuthPostsView';
import { isLoggedIn } from './auth'; // Import isLoggedIn from your auth module

const Switch = () => {
  return (
    <Routes>
      <Route path="/logindashboard" element={<LoginDashboard />} />
      <Route path="/" element={<PostsView />} />
        <Route path="/authpostsview" element={<AuthPostsView />} />
      {isLoggedIn() && (
        <Route path="/userdashboard" element={<UserDashboard />} />
      )}
      {/* Add more routes here */}
    </Routes>
  );
};

export default Switch;
