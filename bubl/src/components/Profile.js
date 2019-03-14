import React, { Component } from "react";
import { connect } from "react-redux";
// components
import UserPosts from "./UserPosts";
import InterestList from "./InterestList";
import { getUserInfo } from "../actions";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    console.log("profile render");
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
            <InterestList />
            <h3>My Recent Posts</h3>
            <UserPosts />
          </div>
        </section>
      );
    }
    return <div> </div>;
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Profile);
