import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { getPostsStart } from "../actions";
// components
import Post from "./Post";
import BlockLoader from "./BlockLoader";
import BlockError from "./BlockError";
class UserPosts extends Component {
  componentDidMount() {
    if (!this.props.userPosts && !this.props.error) {
      this.props.getPostsStart();
    }
  }
  render() {
    if (this.props.error) {
      return <BlockError text="Sorry, we can't find your posts." />;
    }
    if (this.props.userPosts) {
      return (
        <section className="posts">
          {this.props.userPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </section>
      );
    }
    return <BlockLoader />;
  }
}

const mapStateToProps = ({ userPosts, error }) => {
  return {
    userPosts,
    error
  };
};

export default connect(
  mapStateToProps,
  { getPostsStart }
)(UserPosts);
