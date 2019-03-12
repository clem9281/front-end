import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Bubls from "./Bubls";
import PostList from "./PostList";
import PrivateRoute from "./PrivateRoute";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <article>
        <NavBar />
        <PrivateRoute exact path="/" component={Profile} />
        <PrivateRoute exact path="/bubls" component={Bubls} />
        <PrivateRoute exact path="/bubls/:id" component={PostList} />
      </article>
    );
  }
}

export default withRouter(Main);
