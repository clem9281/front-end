import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// utils
import withNavigation from "./utils/withNavigation";
// components
import { PrivateRoute } from "./components";
// views
import {
  LoginView,
  SignUpView,
  ProfileView,
  BublsView,
  SingleBublView
} from "./views";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" exact render={props => <LoginView {...props} />} />
        <Route
          path="/signup"
          exact
          render={props => <SignUpView {...props} />}
        />
        <PrivateRoute exact path="/" component={ProfileView} />
        <PrivateRoute exact path="/bubls" component={BublsView} />
        <PrivateRoute exact path="/bubls/:id" component={SingleBublView} />
      </div>
    );
  }
}
const mapStateToProps = ({ loggingOut, isLoggedIn }) => ({
  loggingOut,
  isLoggedIn
});

export default withRouter(connect(mapStateToProps, {})(withNavigation(App)));
