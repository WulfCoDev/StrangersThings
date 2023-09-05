import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './auth';
import PostsView from './PostsView';


const AuthPostsView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      
      navigate('/authpostsview');
    }
  }, [navigate]);

  return (
    <div>
      <PostsView />
    </div>
  );
};

export default AuthPostsView;
