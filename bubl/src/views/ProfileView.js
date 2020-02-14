import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getPostsStart } from "../actions";
import { FullPageLoader, MainError, UserPosts } from "../components";

class ProfileView extends React.Component {
  componentDidMount() {
    this.props.getUserInfo();
    this.props.getPostsStart();
  }
  render() {
    if (this.props.error) {
      return (
        <MainError text="Sorry, we couldn't find your profile information." />
      );
    }
    if (this.props.userInfo) {
      const { bio, bubbles, name } = this.props.userInfo;
      return (
        <section className="profile">
          <header />
          <figure>
            <img
              src="https://images.unsplash.com/photo-1469899324414-c72bfb4d4161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
              alt="user"
              className="profile-pic"
            />
          </figure>
          <div className="container">
            <h2>{name}</h2>
            <p className="bio">{bio}</p>
            {/* <InterestList bubbles={bubbles} /> */}
            <h3>My Recent Posts</h3>
            <UserPosts userPosts={this.props.userPosts} />
          </div>
        </section>
      );
    }
    // loading user info
    return <FullPageLoader />;
  }
}

const mSTP = ({ userState }) => ({
  userInfo: userState.userInfo,
  error: userState.error,
  userPosts: userState.userPosts
});
export default connect(mSTP, { getUserInfo, getPostsStart })(ProfileView);
