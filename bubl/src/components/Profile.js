import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import UserPosts from "./UserPosts";
import Post from "./Post";
import InterestList from "./InterestList";
import { getUserInfo } from "../actions";

class Profile extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    console.log(this.props);
    if (this.props.userInfo) {
      const { bio, bubbles, id, name, picture, username } = this.props.userInfo;
      return (
        <section className="profile">
          <NavBar />
          <div className="container">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1469899324414-c72bfb4d4161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                alt="user profile picture"
                className="profile-pic"
              />
            </figure>
            <h2>{name}</h2>
            <p>{bio}</p>
            <InterestList />
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
