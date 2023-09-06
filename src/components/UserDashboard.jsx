import React, { useEffect, useState } from 'react';
import { isLoggedIn, makeHeaders, getToken } from './auth';
import { useNavigate } from 'react-router-dom';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import NewPostForm from './NewPostForm';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUserData();
    }
  }, []);
  console.log(userData);

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data with token:', getToken());
      const response = await fetch(APIURL + `/users/me`, {
        headers: makeHeaders(),
      });

      if (response.ok) {
        const data = await response.json();

      
        const { cohort, messages, posts, username } = data.data;

      
        setUserData({
          cohort,
          messages,
          posts,
          username,
        });
      } else {
        console.error('API Error:', response.status, response.statusText);
      
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEdit = async (postID) => {

    navigate(`/edit-post/${postID}`);
  };

  const handleDelete = (deletedPostID) => {
  
    setUserData((prevState) => ({
      ...prevState,
      posts: prevState.posts.filter((post) => post._id !== deletedPostID),
    }));
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className='user-dashboard'>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <h3>Cohort: {userData.cohort}</h3>
          <NewPostForm onPostCreated={handlePostCreated} />
          <h2>Your Posts:</h2>
          <ul>
          {userData && userData.posts
  ? userData.posts
      .filter((post) => post.active)
      .map((post) => (
        <li key={post._id}>
          {post.title} - {post.description} - {post.price}
          <EditButton postID={post._id} onEdit={handleEdit} />
          <DeleteButton postID={post._id} onDelete={handleDelete} />
        </li>
      ))
  : null}
          </ul>
          <h2>Your Messages:</h2>
          <ul>
            {userData.messages.map((message) => (
              <li key={message._id}>
                <strong>Post:</strong> {message.post.title} <br />
                <strong>From:</strong> {message.fromUser.username} <br />
                <strong>Content:</strong> {message.content} <br />
              </li>
            ))}
          </ul>

        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;