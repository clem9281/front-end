import React, { Component } from "react";
import bublLogo from "../assets/bubl-logo.png";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions";
import DropDown from "./DropDown";

class NavBar extends Component {
  state = {
    width: null,
    dropdown: false
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth });
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () => {
    this.setState({ width: window.innerWidth });
    if (window.innerWidth > 500) {
      this.setState({ dropdown: false });
    }
  };
  handleMenuClick = e => {
    e.preventDefault();
    this.setState({ dropdown: !this.state.dropdown });
  };
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
            {this.state.width > 500 ? (
              <>
                <NavLink exact to="/bubls">
                  My Bubls
                </NavLink>
                <NavLink exact to="/">
                  Profile
                </NavLink>
                <button onClick={this.logOut}> Log Out </button>
              </>
            ) : (
              <button onClick={this.handleMenuClick}>
                <i className="fas fa-bars fa-2x" />
              </button>
            )}
          </div>
          {this.state.dropdown && <DropDown />}
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
