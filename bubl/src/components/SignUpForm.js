import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// logo image
import bublLogo from "../assets/bubl-logo.png";
// actions
import { signUpStart, getSchoolsStart, clearError } from "../actions";
// components
import Loader from "react-loader-spinner";
import LoginError from "./LoginError";
import FullPageLoader from "./FullPageLoader";

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
    // get the schools for the school select field, once you have the schools set the school id
    this.props.getSchoolsStart().then(() => {
      if (this.props.schools) {
        this.setState({
          information: {
            ...this.state.information,
            school_id: this.props.schools[0].id
          }
        });
      }
    });
  }
  // handle sign up
  signUp = (e, info) => {
    e.preventDefault();
    console.log(this.state.information);
    this.props
      .signUpStart(info)
      .then(() => !this.props.error && this.props.history.push("/login"));
  };
  // form change: if changing the school we need to get it's id
  handleChange = e => {
    console.log(e.target.name);
    if (e.target.name === "school_id") {
      console.log("here");
      this.setState({
        information: {
          ...this.state.information,
          school_id: Number(e.target.value)
        }
      });
    } else {
      this.setState({
        information: {
          ...this.state.information,
          [e.target.name]: e.target.value
        }
      });
    }
  };
  render() {
    if (this.props.signingUp) {
      return <FullPageLoader />;
    }
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
              <label htmlFor="school_id">Your School</label>
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

const mapStateToProps = ({
  schoolsError,
  schools,
  gettingSchools,
  error,
  signingUp
}) => ({
  error,
  schoolsError,
  schools,
  gettingSchools,
  signingUp
});

export default connect(
  mapStateToProps,
  { signUpStart, getSchoolsStart, clearError }
)(SignUpForm);
