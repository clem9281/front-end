import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { signUpStart, getSchoolsStart, clearError } from "../actions";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import LoginError from "./LoginError";
import bublLogo from "../assets/bubl-logo.png";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: {
        name: "",
        username: "",
        password: "",
        school_id: ""
      },
      schools: null
    };
  }
  componentDidMount() {
    // axios.get("https://build-week-bubl.herokuapp.com/api/schools").then(res =>
    //   this.setState({
    //     schools: res.data,
    //     information: { ...this.state.information, school_id: res.data[0].id }
    //   })
    // );
    this.props.getSchoolsStart();
  }
  signUp = (e, info) => {
    e.preventDefault();
    console.log(this.state.information);
    this.props
      .signUpStart(info)
      .then(() => !this.props.error && this.props.history.push("/"));
  };
  handleChange = e => {
    this.setState({
      information: {
        ...this.state.information,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    console.log(this.props);
    return (
      <section className="signup-form">
        <div className="container">
          <div className="color-overlay">
            <form onSubmit={e => this.signUp(e, this.state.information)}>
              <div className="logo">
                <img className="white-bubl" src={bublLogo} alt="white bubble" />
              </div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={this.state.information.name}
                onChange={this.handleChange}
                placeholder="Name"
              />
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                name="username"
                value={this.state.information.username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.information.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
              <label htmlFor="school">Your School</label>
              {this.props.schoolsError && (
                <p>Sorry, we can't find any schools right now.</p>
              )}
              {this.props.gettingSchools && (
                <Loader type="ThreeDots" color="#66bb6a" />
              )}

              {this.props.schools && (
                <select
                  name="school_id"
                  id=""
                  value={this.state.information.school_id}
                  onChange={this.handleChange}
                >
                  {this.props.schools.map(school => (
                    <option value={school.id} key={school.id} id={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              )}
              {this.props.error && <LoginError error={this.props.error} />}
              <button>Sign Up</button>
              <p>or</p>
              <Link to="/login" onClick={this.props.clearError}>
                Login
              </Link>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ schoolsError, schools, gettingSchools, error }) => {
  return {
    error,
    schoolsError,
    schools,
    gettingSchools
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signUpStart, getSchoolsStart, clearError }
  )(SignUpForm)
);
