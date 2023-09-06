import React, { useEffect, useState } from 'react';
import { isLoggedIn } from './auth';
import NewPostForm from './NewPostForm';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import MessageForm from './MessageForm';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

function PostsView() {
  const [posts, setPosts] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetch(APIURL + '/posts', {
      headers: {
        'Content-Type': 'application/json',
        ...(isLoggedIn() && {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
  }, []);


  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostDeleted = (deletedPostID) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostID));
  };

  const toggleForm = () => {  // New function
    setFormVisible(!isFormVisible);
  };

  const [isMessageFormVisible, setMessageFormVisible] = useState(false);

  const toggleMessageForm = () => {
    setMessageFormVisible(!isMessageFormVisible);
  };

  const handleNewMessage = (newMessage) => {
    // Update state or do something with the new message
    console.log('New message:', newMessage);
  };

  const postItems = posts.map((post) => (
    <div key={post._id}>
      <h2>{post.title}</h2>
      <p>Price: {post.price}</p>
      <p>Description: {post.description}</p>
      {post.isAuthor && <EditButton postID={post._id} />}
      {post.isAuthor && <DeleteButton postID={post._id} onDelete={handlePostDeleted} />}
      <button onClick={toggleMessageForm}>Send Message</button>
      {isMessageFormVisible && <MessageForm postID={post._id} onMessageSent={handleNewMessage} />}
    </div>
  ));

  return (
    <div>
      <button onClick={toggleForm}>Create New Post</button>  {/* New button */}
      {isFormVisible && <NewPostForm onPostCreated={handlePostCreated} />}  {/* Conditional rendering */}
      {postItems}
    </div>
  );
}

export default PostsView;
