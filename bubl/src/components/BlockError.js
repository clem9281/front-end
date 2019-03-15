import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { clearError } from "../actions";

const BlockError = props => {
  const tryAgain = e => {
    e.preventDefault();
    props.clearError();
  };
  return (
    <section className="block-error">
      <h2>{props.text}</h2>
      <button onClick={tryAgain}>Try Again</button>
    </section>
  );
};

const mapStateToProps = ({ error }) => ({ error });

export default withRouter(
  connect(
    mapStateToProps,
    { clearError }
  )(BlockError)
);
