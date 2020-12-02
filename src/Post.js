import { Avatar, IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import React from "react";
import "./Post.css";
function Post({ imageUrl, username, caption }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />

        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />
      <IconButton >
        <Favorite />
      </IconButton>
      <h3 className="post__text">
        <strong>{username}</strong>: {caption}
      </h3>
    </div>
  );
}

export default Post;
