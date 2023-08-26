import React, {useEffect, useState} from "react";
import NewPostForm from './NewPostForm';

const APIURL = `https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D`;


function PostsView () {
    const [posts, setPosts] = useState ([]);

    useEffect(() => {
        fetch(APIURL + '/posts')
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data:', data);
      
        
            const fetchedPosts = data.data.posts;
      
            setPosts(fetchedPosts);
          })
          .catch(error => console.error('Error fetching posts:', error));
      }, []);

    const postItems = posts.map (post => (
        <div key={post._id}>
            <h2>{post.title}</h2>
            <p>Price: {post.price}</p>
            <p>Description: {post.description}</p>
        </div>
    ));

    const handlePostCreated = (newPost) => {
        // Update state with the new post
        setPosts([...posts, newPost]);
      };

    return (
        <div>
            {postItems}
            <NewPostForm onPostCreated={handlePostCreated} />
        </div>
    );
}

export default PostsView;