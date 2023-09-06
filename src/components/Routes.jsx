import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostsView from './PostsView';
import LoginDashboard from './LoginDashboard';
import UserDashboard from './UserDashboard';
import { isLoggedIn } from './auth';
import EditPost from './EditPost';

const Switch = () => {
  return (
    <Routes>
      <Route path="/logindashboard" element={<LoginDashboard />} />
      <Route path="/" element={<PostsView />} />
      {isLoggedIn() && (
        <Route path="/userdashboard" element={<UserDashboard />} />
      )}
      <Route path="/edit-post/:postID" element={<EditPost />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default Switch;
