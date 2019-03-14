import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import SignUpForm from "./components/SignUpForm";
import Main from "./components/Main";

class App extends Component {
  render() {
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

export default App;
