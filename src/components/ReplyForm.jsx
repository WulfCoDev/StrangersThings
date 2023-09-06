import { useState } from "react";

const ReplyForm = ({ onReply, messageId }) => {
    const [content, setContent] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onReply(messageId, content);
      setContent('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your reply..."
        />
        <button type="submit">Send</button>
      </form>
    );
  };

export default ReplyForm;