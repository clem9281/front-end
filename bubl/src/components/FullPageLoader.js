import React from "react";
import Loader from "react-loader-spinner";

const FullPageLoader = () => {
  return (
    <div className="full-loader">
      <Loader type="ThreeDots" color="#66bb6a" height="100" width="100" />
    </div>
  );
};

export default FullPageLoader;
