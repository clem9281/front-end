import React, { Component } from "react";

class SignUpForm extends Component {
  constructor(props) {
    this.state = {
      information: {
        firstName: "",
        lastName: "",
        password: "",
        interests: []
      }
    };
  }
  handleChange = e => {
    this.setState({
      information: {
        ...this.state.information,
        [e.target.name]: e.target.value
      }
    });
  };
  render() {
    <section className="signup-form">
      <div>
        <form>
          <label htmlFor="first-name">First Name</label>
          <input type="text" name="first-name" />
          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="last-name" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="interests">Interests</label>
          <input type="text" name="interests" />
        </form>
      </div>
    </section>;
  }
}

export default SignUpForm;
