import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const BlockError = props => {
  return (
    <section className="block-error">
      <h2>{props.text}</h2>
    </section>
  );
};

const mapStateToProps = ({ error }) => ({ error });

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(BlockError)
);
