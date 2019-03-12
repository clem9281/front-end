import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { signUpStart } from "../actions";

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
    axios.get("https://build-week-bubl.herokuapp.com/api/schools").then(res =>
      this.setState({
        schools: res.data,
        information: { ...this.state.information, school_id: res.data[0].id }
      })
    );
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
    return (
      <section className="signup-form">
        <div>
          <form onSubmit={e => this.signUp(e, this.state.information)}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.information.name}
              onChange={this.handleChange}
            />
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              name="username"
              value={this.state.information.username}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.information.password}
              onChange={this.handleChange}
            />
            <select
              name="school_id"
              id=""
              value={this.state.information.school_id}
              onChange={this.handleChange}
            >
              {this.state.schools &&
                this.state.schools.map(school => (
                  <option value={school.id} key={school.id} id={school.id}>
                    {school.name}
                  </option>
                ))}
            </select>
            <button>Sign Up</button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ error }) => {
  console.log(error);
  return {
    error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signUpStart }
  )(SignUpForm)
);
