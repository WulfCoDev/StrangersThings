import { useEffect, useState } from 'react';
import { isLoggedIn } from './auth';
import NewPostForm from './NewPostForm';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import MessageForm from './MessageForm';
import '../App.css';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

function postMatches(post, text) {
  return (
    post.title.toLowerCase().includes(text.toLowerCase()) || 
    post.description.toLowerCase().includes(text.toLowerCase())
  );
}

function PostsView() {
  const [posts, setPosts] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

        const fetchPosts = async () => {
          try {
            const response = await fetch(APIURL + '/posts', {
              headers: {
                'Content-Type': 'application/json',
                ...(isLoggedIn() && {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }),
              },
            });
            const data = await response.json();
            setPosts(data.data.posts);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
      
        useEffect(() => {
          fetchPosts();
        }, []);
      
        const handlePostCreated = async () => {
          fetchPosts(); 
        };

  const handlePostDeleted = (deletedPostID) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostID));
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const [isMessageFormVisible, setMessageFormVisible] = useState(false);

  const toggleMessageForm = () => {
    setMessageFormVisible(!isMessageFormVisible);
  };

  const handleNewMessage = (newMessage) => {

    console.log('New message:', newMessage);
  };

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  const postItems = postsToDisplay.map((post) => (
    <div className='post-item' key={post._id}>
      <h2>{post.title}</h2>
      <p>Post-ID: {post._id}</p>
      <p>Price: {post.price}</p>
      <p>Description: {post.description}</p>
      <p>Location: {post.location}</p>
      <p>Author: {post.author.username}</p>
      {post.isAuthor && <EditButton className='edit-button' postID={post._id} />}
      {post.isAuthor && <DeleteButton className='delete-button' postID={post._id} onDelete={handlePostDeleted} />}
      <button onClick={toggleMessageForm}>Send Message</button>
      {isMessageFormVisible && <MessageForm postID={post._id} onMessageSent={handleNewMessage} />}
    </div>
  ));

  return (
    <div className='posts-view'>
      <input
        type="text"
        placeholder="Filter posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='create-post' onClick={toggleForm}>Create New Post</button>
      {isFormVisible && <NewPostForm onPostCreated={handlePostCreated} />}
      {postItems}
    </div>
  );
}

export default PostsView;
