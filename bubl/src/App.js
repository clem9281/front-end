import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
// import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Profile />
        </div>
      </Router>
    );
  }
}

export default App;
