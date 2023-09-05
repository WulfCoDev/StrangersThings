import React, { useState } from 'react';
import { makeHeaders } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const NewPostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // Add price state

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(APIURL + '/posts', {
        method: 'POST',
        headers: makeHeaders(),
        body: JSON.stringify({ title, description, price }), // Include price
      });

      if (response.ok) {
        const newPost = await response.json();
        // Update state with the new post
        onPostCreated(newPost);
        // Clear form fields
        setTitle('');
        setDescription('');
        setPrice('');
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <label>Price</label> {/* Add price input */}
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPostForm;