import React, { useEffect, useState } from 'react';
import NewPostForm from './NewPostForm';
import { isLoggedIn } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

function PostsView() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch and set posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch(APIURL + '/posts', {
      headers: {
        'Content-Type': 'application/json',
        // Include the Authorization header with the token if the user is logged in
        ...(isLoggedIn() && {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        const fetchedPosts = data.data.posts;
        setPosts(fetchedPosts);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };

  const postItems = posts.map((post) => (
    <div key={post._id}>
      <h2>{post.title}</h2>
      <p>Price: {post.price}</p>
      <p>Description: {post.description}</p>
      {isLoggedIn() && (
        <div>
          <p>Location: {post.location}</p>
          <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
          {post.isAuthor && (
            <button>Edit Post</button>
          )}
          {/* Display messages for the user's posts */}
          {post.isAuthor && post.message.length > 0 && (
            <div>
              <h3>Messages:</h3>
              {post.message.map((message) => (
                <div key={message._id}>
                  <p>From User: {message.fromUser.username}</p>
                  <p>Content: {message.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  ));

  return (
    <div>
      {isLoggedIn() && <NewPostForm />}
      {postItems}
    </div>
  );
}

export default PostsView;
