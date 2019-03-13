import React, { Component } from "react";
import bublLogo from "../assets/bubl-logo.png";
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
            <img src={bublLogo} alt="" />
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
