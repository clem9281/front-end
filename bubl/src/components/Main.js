import React from "react";
import { connect } from "react-redux";
// components
import NavBar from "./NavBar";
import Profile from "./Profile";
import Bubls from "./Bubls";
import PostList from "./PostList";
import PrivateRoute from "./PrivateRoute";

// actions
import { closeMenu } from "../actions";
const Main = ({ menuOpen, closeMenu }) => {
  return (
    <article>
      <NavBar />
      {/* if the menu is open close the menu when you click anywhere in main */}
      <section
        className="main"
        onClick={() => {
          if (menuOpen) closeMenu();
        }}
      >
        <PrivateRoute exact path="/" component={Profile} />
        <PrivateRoute exact path="/bubls" component={Bubls} />
        <PrivateRoute exact path="/bubls/:id" component={PostList} />
      </section>
    </article>
  );
};

const mapStateToProps = ({ menuOpen }) => ({ menuOpen });

export default connect(
  mapStateToProps,
  { closeMenu }
)(Main);
