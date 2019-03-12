import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { getUserInfo, getSchoolBubls, getBublPosts } from "../actions";
import { withRouter } from "react-router-dom";
import FuzzySearch from "fuzzy-search";
class Bubls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bublSearch: "",
      result: []
    };
  }
  componentDidMount() {
    if (!this.props.userInfo) {
      this.props.getUserInfo();
    }
    console.log(this.props.allSchoolBubls);
  }
  handleFocus = () => {
    this.props.getSchoolBubls();
  };
  handleClick = id => {
    this.props.getBublPosts(id).then(this.props.history.push(`bubls/${id}`));
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (this.props.allSchoolBubls && this.state.bublSearch) {
      console.log(1);
      const searcher = new FuzzySearch(this.props.allSchoolBubls, ["bubble"]);
      const result = searcher.search(this.state.bublSearch);
      this.setState({ result: result });
    } else if (this.props.allSchoolBubls) {
      console.log(2);
      const result = this.props.allSchoolBubls;
      this.setState({ result: result });
    }
  };
  render() {
    console.log(this.state.result);
    if (this.props.userInfo) {
      return (
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
              name="bublSearch"
              onFocus={this.handleFocus}
              value={this.state.bublSearch}
              onChange={this.handleChange}
            />
          </form>
          <ul>
            {this.state.result.length > 0 &&
              this.state.result.map(bubl => (
                <li key={bubl.id}>{bubl.bubble}</li>
              ))}
          </ul>
        </section>
      );
    }
    return <div />;
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    allSchoolBubls: state.allSchoolBubls
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo, getSchoolBubls, getBublPosts }
  )(Bubls)
);
