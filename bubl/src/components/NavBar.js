import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
// actions
import { logOut, toggleMenu } from "../actions";
// components
import DropDown from "./DropDown";
// logo image
import bublLogo from "../assets/bubl-logo.png";

class NavBar extends Component {
  state = {
    width: null
  };
  componentDidMount() {
    // get the window width for the nav bad
    this.setState({ width: window.innerWidth });
    window.addEventListener("resize", this.handleResize);
  }
  // remove the even listener
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
    this.props.toggleMenu();
  };
  logOut = e => {
    this.props.logOut();
    this.props.history.push("/login");
  };

  render() {
    console.log(this.props.history);
    return (
      <header>
        <nav>
          <div className="brand">
            <a
              href="https://bubl-marketing.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={bublLogo} alt="bubl logo" />
            </a>
          </div>
          <div className="links">
            {/* if the width of the screen is greater than 600px display the inline nav, otherwise show the menu buton */}
            {this.state.width > 600 ? (
              <>
                <NavLink exact to="/bubls">
                  My Bubls
                </NavLink>
                <NavLink exact to="/">
                  Profile
                </NavLink>
                <button className="navbar-desktop-button" onClick={this.logOut}>
                  Log Out
                </button>
              </>
            ) : (
              <button
                className="navbar-desktop-button"
                onClick={this.handleMenuClick}
              >
                <i className="fas fa-bars fa-2x" />
              </button>
            )}
          </div>
          {/* if menu open is true display the dropdown */}
          {this.props.menuOpen && <DropDown />}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ menuOpen }) => ({ menuOpen });

export default withRouter(
  connect(
    mapStateToProps,
    { logOut, toggleMenu }
  )(NavBar)
);
