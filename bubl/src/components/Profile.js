import React from "react";
import NavBar from "./NavBar";

const Profile = props => {
  return (
    <section className="profile">
      <NavBar />
      <figure>
        <img
          src="https://images.unsplash.com/photo-1469899324414-c72bfb4d4161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
          alt="user profile picture"
          className="profile-pic"
        />
      </figure>
    </section>
  );
};

export default Profile;
