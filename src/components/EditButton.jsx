import { useNavigate } from 'react-router-dom';

const EditButton = ({ postID }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-post/${postID}`);
  };

  return <button onClick={handleEdit}>Edit</button>;
};

export default EditButton;