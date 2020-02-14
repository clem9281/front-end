import React from "react";

// components
import Post from "./Post";
import BlockLoader from "./BlockLoader";
import BlockError from "./BlockError";
const UserPosts = ({ userPosts, error }) => {
  if (error) {
    return <BlockError text="Sorry, we can't find your posts." />;
  }
  if (userPosts) {
    return (
      <section className="posts">
        {userPosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </section>
    );
  }
  return <BlockLoader />;
};

export default UserPosts;
