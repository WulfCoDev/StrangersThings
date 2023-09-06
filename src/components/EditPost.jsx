import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { makeHeaders, getToken } from './auth';
import { useNavigate } from 'react-router-dom';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;
const EditPost = () => {
  const { postID } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${APIURL}/posts/${postID}`, {
        headers: makeHeaders(),
      });

      const data = await response.json();
      const fetchedPost = data.data;
      setPost(fetchedPost);
      setTitle(fetchedPost.title);
      setDescription(fetchedPost.description);
      setPrice(fetchedPost.price);
    };

    fetchPost();
  }, [postID]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${APIURL}/posts/${postID}`, {
        method: 'PATCH',
        headers: makeHeaders(),
        body: JSON.stringify({
          post: { title, description, price },
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Post edited successfully:', data);
        Navigate('/userdashboard');
      } else {
        console.error('Failed to edit post:', data.error.message);
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;
