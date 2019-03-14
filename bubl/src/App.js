import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// components
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import SignUpForm from "./components/SignUpForm";
import Main from "./components/Main";
import FullPageLoader from "./components/FullPageLoader";
class App extends Component {
  componentDidMount() {
    console.log("app");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
  }
  render() {
    if (this.props.loggingOut) {
      return <FullPageLoader />;
    }
    return (
      <Router>
        {/* <Switch> */}
        <div className="App">
          <Route path="/login" exact render={props => <Login {...props} />} />
          <Route
            path="/signup"
            exact
            render={props => <SignUpForm {...props} />}
          />
          <PrivateRoute path="/" component={Main} />
        </div>
        {/* </Switch> */}
      </Router>
    );
  }
}
const mapStateToProps = ({ loggingOut }) => ({ loggingOut });
export default connect(
  mapStateToProps,
  {}
)(App);
