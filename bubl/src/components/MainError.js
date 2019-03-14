import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const MainError = props => {
  return (
    <section className="main-error">
      <h2>{props.text}</h2>
      <button onClick={props.history.goBack}>Go Back</button>
    </section>
  );
};

const mapStateToProps = ({ error }) => ({ error });

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(MainError)
);
