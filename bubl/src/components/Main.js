import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// components
import NavBar from "./NavBar";
import Profile from "./Profile";
import Bubls from "./Bubls";
import PostList from "./PostList";
import PrivateRoute from "./PrivateRoute";

// actions
import { closeMenu } from "../actions";
const Main = props => {
  return (
    <article>
      <NavBar />
      {/* close the menu when you click anywhere in main */}
      <section className="main" onClick={props.closeMenu}>
        <PrivateRoute exact path="/" component={Profile} />
        <PrivateRoute exact path="/bubls" component={Bubls} />
        <PrivateRoute exact path="/bubls/:id" component={PostList} />
      </section>
    </article>
  );
};

export default connect(
  null,
  { closeMenu }
)(Main);
