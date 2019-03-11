import React, { Component } from "react";
import { connect } from "react-redux";
import { loginStart } from "../actions";
// import "../CSS/index.css";

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  // login = e => {
  //     e.preventDefault();
  //     this.props.login(this.state.credentials).then(() => {
  //         this.props.history.push('');
  //     });
  // };
  render() {
    const { username, password } = this.state.credentials;
    return (
      <section className="login">
        <div>
          <form>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
        </div>
      </section>
    );
  }
}

export default connect(
  null,
  {}
)(Login);
