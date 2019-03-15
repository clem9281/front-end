import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component: Component, match, history, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("userToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default withRouter(PrivateRoute);
