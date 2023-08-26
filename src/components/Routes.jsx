import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostsView from './PostsView';
import Dashboard from './Dashboard';

const Switch = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/postsview" element={<PostsView />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default Switch;