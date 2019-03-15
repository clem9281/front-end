import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { getPostsStart } from "../actions";
// components
import Post from "./Post";
import BlockLoader from "./BlockLoader";
import BlockError from "./BlockError";
class UserPosts extends Component {
  // since I am calling set state after an asynchronous action, sometimes set state was getting called after the component unmounted. adding this property to our component fixed the memory leak
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      postData: null
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.getPostsStart().then(() => {
      if (this._isMounted) {
        this.setState({ postData: this.props.userPosts });
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.props.error) {
      return <BlockError text="Sorry, we can't find your posts." />;
    }
    if (this.props.userPosts && !this.props.gettingUserPosts) {
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

const mapStateToProps = ({ userPosts, error, gettingUserPosts }) => {
  return {
    gettingUserPosts,
    userPosts,
    error
  };
};

export default connect(
  mapStateToProps,
  { getPostsStart }
)(UserPosts);
