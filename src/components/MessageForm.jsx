import React, { useState } from 'react';
import { getToken, makeHeaders } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const MessageForm = ({ postID, onMessageSent }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${APIURL}/posts/${postID}/messages`, {
        method: 'POST',
        headers: makeHeaders(),
        body: JSON.stringify({
          message: { content }
        }),
      });

      const result = await response.json();
      if (result.success) {
        onMessageSent(result.data.message);
        setContent(''); // Reset the input
      } else {
        console.error('Failed to send message:', result.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='message-form'>
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">Send Message</button>
    </form>
    </div>
  );
};

export default MessageForm;
