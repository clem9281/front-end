import React, { Component } from "react";
import bublWhite from "../assets/bubl-logo-white.png";
import { connect } from "react-redux";
import { logOut } from "../actions";

class NavBar extends Component {
  state = {};
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

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
            <a href="#">Profile Settings or Something</a>
            <button onClick={this.logOut}> Log Out </button>
          </div>
        </nav>
      </header>
    );
  }
}

export default connect(
  null,
  { logOut }
)(NavBar);
