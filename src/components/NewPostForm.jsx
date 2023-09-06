import React, { useState } from 'react';
import { makeHeaders } from './auth.jsx';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

const NewPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    willDeliver: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = makeHeaders();

    try {
      const response = await fetch(`${APIURL}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          post: formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Post created:', result.data);
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('There was an issue submitting your form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className='new-post-form'>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      ></textarea>
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location (Optional)"
      />
      <label>
        Will Deliver?
        <input
          type="checkbox"
          name="willDeliver"
          checked={formData.willDeliver}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Post</button>
    </form>
    </div>
  );
};

export default NewPostForm;
