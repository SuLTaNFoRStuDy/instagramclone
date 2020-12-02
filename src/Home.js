import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Post from './Post'
import FlipMove from "react-flip-move";
import ImageUpload from "./ImageUpload";
import "./App.css";

function Home({user,username,setUsername}) {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);

  return (
    <div className='app'>
      <div className="app__posts">
        <FlipMove >
          <div className="app__postsLeft">
            {posts.map(({ id, post }) => (
              <Post
                user={user}
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </FlipMove>

        
      </div>

      {user?.displayName ? (
        <div className="app__upload">
          <ImageUpload username={user.displayName} />
        </div>
      ) : (
        <center>
          <h3>Login to upload</h3>
        </center>
      )}
    </div>
  );
}

export default Home;
