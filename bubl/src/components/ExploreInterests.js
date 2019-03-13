import React, { Component } from "react";
import { useInput } from "../hooks/useInput";
import { connect } from "react-redux";

const ExploreInterests = props => {
  const exploreInput = useInput();

  return (
    <section className="explore container">
      <form>
        <div className="inline-input">
          <input
            type="text"
            value={exploreInput.value}
            onChange={exploreInput.updateValue}
          />
          <button>
            <i className="fas fa-search" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default ExploreInterests;
