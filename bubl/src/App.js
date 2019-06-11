import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// components
import {
  Login,
  PrivateRoute,
  SignUpForm,
  NavBar,
  Profile,
  Bubls,
  PostList
} from "./components";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route path="/login" exact render={props => <Login {...props} />} />
        <Route
          path="/signup"
          exact
          render={props => <SignUpForm {...props} />}
        />
        <PrivateRoute exact path="/" component={Profile} />
        <PrivateRoute exact path="/bubls" component={Bubls} />
        <PrivateRoute exact path="/bubls/:id" component={PostList} />
      </div>
    );
  }
}
const mapStateToProps = ({ loggingOut, isLoggedIn }) => ({
  loggingOut,
  isLoggedIn
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
