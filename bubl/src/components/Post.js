import React from "react";
import { connect } from "react-redux";
import moment from "moment";

const Post = props => {
  const { post_content, updated_at, created_at, likes, name } = props.post;
  return (
    <div className="post">
      <p className="post-content">
        <span className="name">{name} </span>
        {post_content}
        <span className="timestamp">{` ${moment(updated_at).fromNow()}`}</span>
      </p>
      <div className="icons">
        <i className="far fa-heart" />
        <i className="far fa-comments" />
        {/* <p className="comment">
          <span className="comment-user">Person </span> Lorem ipsum dolor sit
          amet!
        </p> */}
      </div>
    </div>
  );
};

export default Post;
