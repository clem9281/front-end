import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// utils
import withNavigation from "./utils/withNavigation";
// components
import {
  PrivateRoute,
  SignUpForm,
  Profile,
  Bubls,
  PostList
} from "./components";
// views
import { LoginView } from "./views";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" exact render={props => <LoginView {...props} />} />
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
  )(withNavigation(App))
);
