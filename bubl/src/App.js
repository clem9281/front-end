import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"; 
import Login from './components/Login';
import Profile from './components/Profile';
import Bubls from "./components/Bubls";
import PrivateRoute from "./components/PrivateRoute";
import SignUpForm from "./components/SignUpForm";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">

      <Route path="/login" render={props => <Login {...props}/>}></Route>
      <Route path="/signup" render={props => <SignUpForm {...props} />} />
      <PrivateRoute exact path="/" component={Profile} />
      
      {/* <Profile /> */}
          {/* <Login /> */}
          
      </div>
      </Router>
    );
  }
}

export default App;
