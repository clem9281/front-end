import React from "react";
import { connect } from "react-redux";
import { getBublPosts } from "../actions";
import Post from "./Post";

class PostList extends React.Component {
  state = {
    newPost: "",
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    if (!this.props.state.bublPosts && !this.props.state.error) {
      this.props.getBublPosts(this.props.match.params.id);
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state.newPost,
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props);
    if (this.props.state.bublPosts) {
      return (
        <div>
          {this.props.state.bublPosts.map(post => (
            <Post post={post} key={post.id} />
          ))}
          <input
            type="text"
            name="newPost"
            value={this.state.newPost}
            onChange={this.handleChange}
          />
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  { getBublPosts }
)(PostList);
