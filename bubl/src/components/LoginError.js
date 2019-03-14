import React from "react";

const LoginError = props => {
  return (
    <div className="error">
      <p>{props.error}</p>
    </div>
  );
};

export default LoginError;
