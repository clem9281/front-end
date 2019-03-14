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
  joinBubl
} from "../actions";

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
  handleFocus = () => {
    this.props.getSchoolBubls().then(() => {
      if (this.props.allSchoolBubls && this.state.bublSearch.length === 0) {
        this.setState({ result: this.props.allSchoolBubls });
      }
    });
  };
  handleBlur = e => {
    if (this.state.bublSearch.length === 0) {
      this.setState({ result: [] });
    }
  };
  // when you click a bubl, go to that bubl's post page
  handleClickBubl = id => {
    this.props.getBublPosts(id).then(this.props.history.push(`bubls/${id}`));
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
              // onBlur={this.handleBlur}
              value={this.state.bublSearch}
              onChange={this.handleChange}
              placeholder="Find Bubls"
              autoComplete="off"
            />
          </form>
          <div className="explore bubls">
            {this.props.gettingSchoolBubls && (
              <Loader type="ThreeDots" color="#66bb6a" />
            )}
            {this.state.result.length > 0 &&
              this.state.result.map(bubl => (
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
        </section>
      );
    }
    return <div />;
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    allSchoolBubls: state.allSchoolBubls,
    gettingSchoolBubls: state.gettingSchoolBubls,
    error: state.error
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo, getSchoolBubls, getBublPosts, joinBubl }
  )(Bubls)
);
