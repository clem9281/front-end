import React, { Component } from "react";
import { NavLink, Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import UserPosts from "./UserPosts";
import PostList from "./PostList";
import InterestList from "./InterestList";
import Bubls from "./Bubls";
import { getUserInfo } from "../actions";

class Profile extends Component {
  componentDidMount() {
    console.log("profile mount", this.props);
    this.props.getUserInfo();
  }
  render() {
    console.log("profile render", this.props);
    if (this.props.userInfo) {
      const { bio, bubbles, id, name, picture, username } = this.props.userInfo;
      return (
        <section className="profile">
          <header />
          <figure>
            <img
              src="https://images.unsplash.com/photo-1469899324414-c72bfb4d4161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
              alt="user profile picture"
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

export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo }
  )(Profile)
);
