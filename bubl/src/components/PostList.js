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
    if (!this.props.state.bublPosts && !this.props.state.error) {
      this.props.getBublPosts(this.props.match.params.id);
    }
  }

  render() {
    console.log(this.props);
    if (this.props.state.bublPosts) {
      return this.props.state.bublPosts.map(post => (
        <Post post={post} key={post.id} />
      ));
      // <p>
      //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
      //   facere iure ad enim incidunt ipsum quis itaque quisquam veritatis.
      //   Dolorem, velit repellat! Cupiditate quibusdam, quos consectetur
      //   corrupti repellendus debitis voluptates? #Football
      // </p>
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
