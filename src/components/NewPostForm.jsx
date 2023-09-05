import React from 'react';
import { makeHeaders } from './auth'; // Import makeHeaders from your auth module

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const NewPostForm = ({ onPostCreated }) => {
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch('https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/posts', {
        method: 'POST',
        headers: makeHeaders(), // Use makeHeaders to include the Authorization header
        body: JSON.stringify({
          post: {
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            location: formData.get('location'),
            willDeliver: formData.get('willDeliver'),
          },
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        console.log(newPost);
        onPostCreated(newPost);

      } else {
        // Handle error
        console.error('Error creating post:', response.statusText);
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
        name="title"
        
        
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        
        
        required
      ></textarea>

      <label>Price</label>
      <input
        type="text"
        name="price"
        
        
        required
      />
      <label>Price</label>
      <input
        type="text"
        name="price"
        
        
        required
      />

      <label>
        Will Deliver
        </label>
        <input
          type="checkbox"
          name="willDeliver"
          
         
        />

      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPostForm;