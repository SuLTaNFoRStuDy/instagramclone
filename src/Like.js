import { Avatar } from "@material-ui/core";
import React from "react";
import "./Like.css";
function Like({ username }) {
  console.log(username);
  return (
    <div className="like">
      <Avatar className="like__avatar" />
      <h3 className="like__text">
        <span className="like__span">username :</span>Liked your post!
      </h3>
      <small>timestamp</small>
    </div>
  );
}

export default Like;
