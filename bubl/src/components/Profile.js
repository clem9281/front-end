import React from "react";
import {connect} from "react-redux";
import NavBar from "./NavBar";
import Post from './Post';
import InterestList from "./InterestList";

const Profile = props => {
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
      <h2>User Name</h2>
        <InterestList />
      <Post />
      </div>
        
    </section>
  );
};

export default connect(null, {})(Profile);
