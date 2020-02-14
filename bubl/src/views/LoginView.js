import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Logo image
import bublLogo from "../assets/bubl-logo.png";
// actions
import { loginStart, clearError } from "../actions";
// components
import { LoginError, FullPageLoader, SignUpSuccess } from "../components";

class LoginView extends React.Component {
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

  login = (e, creds) => {
    e.preventDefault();
    this.props.loginStart(creds).then(() => {
      if (!this.props.error) {
        this.props.history.push("/");
      }
    });
  };
  render() {
    const { username, password } = this.state.credentials;
    // display the loader while logging in
    if (this.props.loggingIn) {
      return <FullPageLoader />;
    }
    return (
      <section className="login">
        <div className="container">
          <div className="color-overlay">
            <form onSubmit={e => this.login(e, this.state.credentials)}>
              <div className="logo">
                <img className="white-bubl" src={bublLogo} alt="white bubble" />
              </div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
              />
              {/* if there is an error display the login error */}
              {this.props.error && <LoginError error={this.props.error} />}
              {/* if the user just signed up display the welcome message */}
              {this.props.signupSuccess && <SignUpSuccess />}
              <button>Login</button>
              <p>or</p>
              <Link to="/signup" onClick={this.props.clearError}>
                Sign Up
              </Link>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mSTP = ({ loginState }) => ({
  error: loginState.error,
  loggingIn: loginState.loggingIn,
  signupSuccess: loginState.signupSuccess
});
export default connect(mSTP, { loginStart, clearError })(LoginView);
