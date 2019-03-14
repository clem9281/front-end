import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// actions
import { logOut, closeMenu } from "../actions";

const DropDown = props => {
  const logOut = () => {
    props.logOut();
    props.history.push("/");
  };
  return (
    <div className="dropdown" onClick={props.closeMenu}>
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
    { logOut, closeMenu }
  )(DropDown)
);
