import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { clearError } from "../actions";

const MainError = props => {
  const tryAgain = e => {
    e.preventDefault();
    props.clearError();
    props.history.goBack();
  };
  return (
    <section className="main-error">
      <h2>{props.text}</h2>
      <button onClick={tryAgain}>Go Back</button>
    </section>
  );
};

const mapStateToProps = ({ error }) => ({ error });

export default withRouter(
  connect(
    mapStateToProps,
    { clearError }
  )(MainError)
);
