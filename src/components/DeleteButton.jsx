import { makeHeaders } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const DeleteButton = ({ postID, onDelete }) => {
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${APIURL}/posts/${postID}`, {
        method: 'DELETE',
        headers: makeHeaders(),
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        // Notify parent to remove post
        onDelete(postID);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <button className='delete-button' onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
