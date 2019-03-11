import React, { Component } from "react";
import bublWhite from "../assets/bubl-logo-white.png";

class NavBar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
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
            </div>
          </nav>
        </header>
      );
    }
  }
  
  export default NavBar;