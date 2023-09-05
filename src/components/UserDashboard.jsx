import React, { useEffect, useState } from 'react';
import { isLoggedIn } from './auth';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(APIURL + `/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <h2>Your Posts:</h2>
          <ul>
            {userData.posts.map((post) => (
              <li key={post._id}>{post.title}</li>
            ))}
          </ul>
          <h2>Your Messages:</h2>
          <ul>
            {userData.messages.map((message) => (
              <li key={message._id}>{message.content}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDashboard;
