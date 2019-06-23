import React from "react";
import { connect } from "react-redux";
import { Login } from "../components";
import { loginStart, clearError } from "../actions";

const LoginView = props => {
  return (
    <section className="login">
      <Login {...props} />
    </section>
  );
};

const mSTP = ({
  error,
  schools,
  gettingSchools,
  loggingIn,
  signupSuccess
}) => ({
  error,
  schools,
  gettingSchools,
  loggingIn,
  signupSuccess
});
export default connect(
  mSTP,
  { loginStart, clearError }
)(LoginView);
