import React from "react";
import { NavBar } from "../components";

// This higher order component checks to see what pathname we are at: we don't want to display the NavBar from /signup or /login

const withNavigation = Component => {
  return class extends React.Component {
    render() {
      const path = this.props.location.pathname;
      if (path !== "/login" && path !== "/signup") {
        return (
          <>
            <NavBar />
            <Component />
          </>
        );
      } else {
        return <Component />;
      }
    }
  };
};

export default withNavigation;
