import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const MainError = props => {
  console.log(props.error, typeof props.error);
  return (
    <section className="main-error">
      <h2>Whoops, something went wrong</h2>
      <button onClick={props.history.goBack}>Go Back</button>
    </section>
  );
};

const mapStateToProps = ({ error }) => [error];

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(MainError)
);
