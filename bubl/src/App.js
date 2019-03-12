import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Bubls from "./components/Bubls";
import PostList from "./components/PostList";
import PrivateRoute from "./components/PrivateRoute";
import SignUpForm from "./components/SignUpForm";
import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/signup" render={props => <SignUpForm {...props} />} />
          <PrivateRoute path="/" component={Main} />
          {/* <PrivateRoute path="/" exact component={Profile} />
          <PrivateRoute exact path="/post-list" component={PostList} />
          <PrivateRoute exact path="/bubls" component={Bubls} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
