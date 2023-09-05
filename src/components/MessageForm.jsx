// MessageForm.js
import React, { useState } from 'react';
import { makeHeaders } from './auth';

const MessageForm = ({ postId, onMessageSent }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${APIURL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: makeHeaders(),
        body: JSON.stringify({ message: { content } }),
      });

      if (response.ok) {
        const data = await response.json();
        onMessageSent(data.message); 
        setContent('');
      } else {
    
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        required
      ></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;