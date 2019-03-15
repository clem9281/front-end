import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// components
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import SignUpForm from "./components/SignUpForm";
import Main from "./components/Main";
import FullPageLoader from "./components/FullPageLoader";

class App extends Component {
  render() {
    if (this.props.loggingOut) {
      return <FullPageLoader />;
    }
    return (
      <div className="App">
        <Route path="/login" exact render={props => <Login {...props} />} />
        <Route
          path="/signup"
          exact
          render={props => <SignUpForm {...props} />}
        />
        {/* basically we need the exact property to be true for the login redirect, but false while the user is within the app */}
        <PrivateRoute
          path="/"
          exact={!this.props.isLoggedIn}
          component={Main}
        />
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
