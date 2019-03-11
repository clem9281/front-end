import React, { Component } from "react";
import { connect } from "react-redux";
import {loginStart} from "../actions";
import {Link} from "react-router-dom";
import bublWhite from '../assets/bubl-logo-white.png';
import "../CSS/index.css";

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

  login = (e, creds)=> {
      e.preventDefault();
      this.props.loginStart(creds)
      .then(() => {
          this.props.history.push('/');
      });
  };
  render() {
    console.log(this.props);
    const { username, password } = this.state.credentials;
    return (
      <section className="login">
        <div>
            <div className='logo'>
                <img className='white-bubl' src={bublWhite} alt='white bubble' />
                <h1>Bubl</h1>
            </div>
          <form onSubmit={e => this.login(e, this.state.credentials)}>
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
            <Link to='/signup'>Sign Up </Link>
          </form>
        </div>
      </section>
    );
  }
}

export default connect(
  null,
  {loginStart}
)(Login);
