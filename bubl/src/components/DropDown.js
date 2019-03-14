import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// actions
import { logOut } from "../actions";

const DropDown = props => {
  const logOut = () => {
    props.logOut();
    props.history.push("/");
  };
  return (
    <div className="dropdown">
      <NavLink exact to="/bubls">
        My Bubls
      </NavLink>
      <NavLink exact to="/">
        Profile
      </NavLink>
      <button id="dropdown-button" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
};

export default withRouter(
  connect(
    null,
    { logOut }
  )(DropDown)
);
