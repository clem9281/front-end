import React, { Component } from "react";

// components
import NavBar from "./NavBar";
import Profile from "./Profile";
import Bubls from "./Bubls";
import PostList from "./PostList";
import PrivateRoute from "./PrivateRoute";
import ExploreInterests from "./ExploreInterests";

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
        <PrivateRoute exact path="/explore" component={ExploreInterests} />
      </article>
    );
  }
}

export default Main;
