import React, { useEffect, useState } from 'react';
import { isLoggedIn, makeHeaders, getToken } from './auth';

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
      console.log('Fetching user data with token:', getToken());
      const response = await fetch(APIURL + `/users/me`, {
        headers: makeHeaders(),
      });

      if (response.ok) {
        const data = await response.json();

        // Assuming the data structure is as follows
        const { cohort, messages, posts, username } = data.data;

        // Now you can access and display this data in your component
        setUserData({
          cohort,
          messages,
          posts,
          username,
        });
      } else {
        console.error('API Error:', response.status, response.statusText);
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