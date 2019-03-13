import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dropdown">
        <NavLink exact to="/bubls">
          My Bubls
        </NavLink>
        <NavLink exact to="/">
          Profile
        </NavLink>
      </div>
    );
  }
}

export default DropDown;
