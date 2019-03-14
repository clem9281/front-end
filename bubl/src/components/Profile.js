import React, { Component } from "react";
import { connect } from "react-redux";
// components
import UserPosts from "./UserPosts";
import InterestList from "./InterestList";
import FullPageLoader from "./FullPageLoader";
import MainError from "./MainError";
// actions
import { getUserInfo } from "../actions";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    if (this.props.error) {
      return <MainError />;
    }
    if (this.props.userInfo) {
      const { bio, bubbles, id, name, picture, username } = this.props.userInfo;
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
            <p>{bio}</p>
            <InterestList bubbles={bubbles} />
            <h3>My Recent Posts</h3>
            <UserPosts />
          </div>
        </section>
      );
    }
    // loading user info
    return <FullPageLoader />;
  }
}

const mapStateToProps = ({ userInfo, error }) => ({ userInfo, error });

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Profile);
