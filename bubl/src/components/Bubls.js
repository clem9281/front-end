import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// extras
import FuzzySearch from "fuzzy-search";
import Loader from "react-loader-spinner";
// actions
import {
  getUserInfo,
  getSchoolBubls,
  getBublPosts,
  joinBubl,
  clearError
} from "../actions";
// components
import BlockError from "./BlockError";
class Bubls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bublSearch: "",
      result: []
    };
  }
  componentDidMount() {
    // get the user info, whether it exists in the store or not: that way it'll get any recent changes to it
    this.props.getUserInfo();
  }
  // clear the error before you go anywhere else
  componentWillUnmount() {
    if (this.props.error) {
      this.props.clearError();
    }
  }
  // get the school bubls when you click the search bar
  handleFocus = e => {
    // if the school bubls don't exist on the store get them and set them to the local state, if they do and the input bar is empty set them to the local state
    if (!this.props.allSchoolBubls) {
      this.props.getSchoolBubls().then(() => {
        if (this.props.allSchoolBubls && this.state.bublSearch.length === 0) {
          this.setState({ result: this.props.allSchoolBubls });
        }
      });
    } else if (this.props.allSchoolBubls && e.target.value.length === 0) {
      this.setState({ result: this.props.allSchoolBubls });
    }
  };
  // when you click a bubl, go to that bubl's post page
  handleClickBubl = id => {
    this.props.history.push(`bubls/${id}`);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (this.props.allSchoolBubls && e.target.value.length > 0) {
      const searcher = new FuzzySearch(this.props.allSchoolBubls, ["bubble"]);
      const result = searcher.search(this.state.bublSearch);
      this.setState({ result: result });
    } else if (this.props.allSchoolBubls) {
      const result = this.props.allSchoolBubls;
      this.setState({ result: result });
    }
  };
  render() {
    if (this.props.userInfo) {
      return (
        <section className="bubls-area container">
          <h2>My Bubls</h2>
          <div className="bubls">
            {/* if the userInfo exists map over the users bubls */}
            {this.props.userInfo.bubbles.map(bubl => (
              <div
                className="bubl"
                key={bubl.id}
                onClick={() => this.handleClickBubl(bubl.id)}
              >
                <div className="accent" />
                {bubl.bubble}
              </div>
            ))}
          </div>
          <h2>Explore</h2>
          <form>
            <input
              type="text"
              name="bublSearch"
              onFocus={this.handleFocus}
              value={this.state.bublSearch}
              onChange={this.handleChange}
              placeholder="Find Bubls"
              autoComplete="off"
            />
          </form>
          <div className="explore">
            {/* if the school bubls exist show them here */}
            {this.props.gettingSchoolBubls && (
              <Loader type="ThreeDots" color="#66bb6a" />
            )}
            {this.props.error && (
              <BlockError text="Sorry, we couldn't find any Bubls for your school." />
            )}
            {/* check the local state for the result we set, as long as there is one show it */}
            {this.state.result.length > 0 && (
              <div className="show-explore bubls">
                <button
                  className="hide-explore"
                  onClick={() => this.setState({ result: [] })}
                >
                  <i className="fas fa-times" />
                </button>
                {this.state.result.map(bubl => (
                  <div
                    key={bubl.id}
                    className="bubl"
                    onClick={() => this.handleClickBubl(bubl.id)}
                  >
                    <div className="accent" />
                    <p>{bubl.bubble}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }
    return <div />;
  }
}
const mapStateToProps = ({
  userInfo,
  allSchoolBubls,
  gettingSchoolBubls,
  error
}) => ({ userInfo, allSchoolBubls, gettingSchoolBubls, error });
export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo, getSchoolBubls, getBublPosts, joinBubl, clearError }
  )(Bubls)
);
