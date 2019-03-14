import React from "react";
import Loader from "react-loader-spinner";

const BlockLoader = () => {
  return (
    <div className="block-loader">
      <Loader type="ThreeDots" color="#66bb6a" height="100" width="100" />
    </div>
  );
};

export default BlockLoader;
