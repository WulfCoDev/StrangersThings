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

        // Assuming the data structure is as follows
        const { cohort, messages, posts, username } = data.data;

        // Now you can access and display this data in your component
        setUserData({
          cohort,
          messages,
          posts,
          username,
        });
      } else {
        console.error('API Error:', response.status, response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEdit = async (postID) => {
    // Navigate to Edit Post page and pass the post ID
    navigate(`/edit-post/${postID}`);
  };

  const handleDelete = (deletedPostID) => {
    // Remove the deleted post from local state
    setUserData((prevState) => ({
      ...prevState,
      posts: prevState.posts.filter((post) => post._id !== deletedPostID),
    }));
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <NewPostForm onPostCreated={handlePostCreated} />
          <h2>Your Posts:</h2>
          <ul>
          {userData && userData.posts
  ? userData.posts
      .filter((post) => post.active)  // Notice the change here
      .map((post) => (
        <li key={post._id}>
          {post.title} - {post.description} - {post.price}
          <EditButton postID={post._id} onEdit={handleEdit} />
          <DeleteButton postID={post._id} onDelete={handleDelete} />
        </li>
      ))
  : null}
          </ul>
          {/* ... (rest of your code for messages etc.) */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;