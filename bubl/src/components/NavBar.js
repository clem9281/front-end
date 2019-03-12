import React, { Component } from "react";
import bublWhite from "../assets/bubl-logo-white.png";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions";

class NavBar extends Component {
  state = {};

  logOut = e => {
    this.props.logOut();
    this.props.history.push("/login");
  };

  render() {
    return (
      <header>
        <nav>
          <div className="brand">
            <img src={bublWhite} alt="" />
            <h3>BUBL</h3>
          </div>
          <div className="links">
            <NavLink exact to="/bubls">
              My Bubls
            </NavLink>
            <NavLink exact to="/">
              Profile
            </NavLink>
            <button onClick={this.logOut}> Log Out </button>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(
  connect(
    null,
    { logOut }
  )(NavBar)
);
