import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { getUserInfo, getSchoolBubls, getBublPosts } from "../actions";
import { withRouter } from "react-router-dom";
class Bubls extends Component {
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.getUserInfo();
    }
  }
  handleFocus = () => {
    this.props.getSchoolBubls();
  };
  handleClick = id => {
    this.props.getBublPosts(id).then(this.props.history.push(`bubls/${id}`));
  };
  render() {
    console.log(this.props);
    if (this.props.userInfo) {
      return (
        <>
          {/* <NavBar /> */}
          <section className="bubls container">
            {this.props.userInfo.bubbles.map(bubl => (
              <div
                className="bubl"
                key={bubl.id}
                onClick={() => this.handleClick(bubl.id)}
              >
                {bubl.bubble}
              </div>
            ))}
            <form>
              <input
                type="text"
                name="bubl-search"
                onFocus={this.handleFocus}
              />
            </form>
          </section>
        </>
      );
    }
    return <div />;
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
    // bubls: state.userInfo.bubbles
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo, getSchoolBubls, getBublPosts }
  )(Bubls)
);
