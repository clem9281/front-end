import React from "react";
import { connect } from "react-redux";
import { getBublPosts } from "../actions";
import {
  addPost,
  getUserInfo,
  getSchoolBubls,
  joinBubl,
  leaveBubl
} from "../actions";
import Post from "./Post";

class PostList extends React.Component {
  state = {
    postData: {
      user_id: "",
      post_content: "",
      bubbles: ""
    }
  };

  componentDidMount() {
    // if the posts don't exist on the store, get them
    if (!this.props.bublPosts && !this.props.error) {
      this.props.getBublPosts(this.props.match.params.id);
    }
    // if the user info doesn't exist on the store, get it, set the userid on component state. If user info does exist, just set the user id on component state

    this.props.getUserInfo().then(() => {
      this.setState({
        postData: {
          ...this.state.postData,
          user_id: this.props.userInfo.id
        }
      });
    });

    // if all the bubls don't exist on the store, get them
    if (!this.props.allSchoolBubls) {
      this.props.getSchoolBubls();
    }
    // the bubbles property is needed for the post request to add a post, set it to this bubble
    this.setState({
      postData: {
        ...this.state.postData,
        bubbles: [Number(this.props.match.params.id)]
      }
    });
  }
  // handle form change
  handleChange = e => {
    e.preventDefault();
    this.setState({
      postData: {
        ...this.state.postData,
        [e.target.name]: e.target.value
      }
    });
  };
  // add post on submit
  addPost = e => {
    e.preventDefault();
    this.props.addPost(this.state.postData).then(() =>
      this.setState({
        postData: {
          ...this.state.postData,
          post_content: ""
        }
      })
    );
  };
  // handle clicking join, after join get the new user info
  handleJoin = (e, id) => {
    e.preventDefault();
    this.props.joinBubl(id).then(() => this.props.getUserInfo());
  };
  // handle clicking leave, after leave navigate back to bubls page
  handleLeave = (e, id) => {
    e.preventDefault();
    this.props.leaveBubl(id).then(() => this.props.history.push("/bubls"));
  };
  render() {
    // wait to render until all the needed data exists in the store
    if (
      this.props.bublPosts &&
      this.props.allSchoolBubls &&
      this.props.userInfo
    ) {
      // get the bubble name, call it bubl
      const bubble = this.props.allSchoolBubls.filter(
        bubl => bubl.id === Number(this.props.match.params.id)
      )[0].bubble;
      // determine if user is a member of this bubl
      const isMember =
        this.props.userInfo.bubbles.filter(
          bubl => bubl.id === Number(this.props.match.params.id)
        ).length !== 0;
      return (
        <div className="post-list">
          {/* if the user is a member of this bubl, show the leave button, else show the join button */}
          <button
            onClick={
              isMember
                ? e => this.handleLeave(e, this.props.match.params.id)
                : e => this.handleJoin(e, this.props.match.params.id)
            }
          >
            {isMember ? "Leave" : "Join"}
          </button>

          <h2>{bubble}</h2>
          {this.props.bublPosts.map(post => (
            <Post post={post} key={post.id} />
          ))}
          <form onSubmit={this.addPost}>
            {/* cannot add a comment longer than 256 characters */}
            <textarea
              className="post-input"
              type="text"
              name="post_content"
              value={this.state.postData.post_content}
              onChange={this.handleChange}
              maxLength="256"
            />
            <button>add post</button>
          </form>
        </div>
      );
    }
    return <div />;
  }
}

const mapStateToProps = ({ bublPosts, error, userInfo, allSchoolBubls }) => ({
  bublPosts,
  error,
  userInfo,
  allSchoolBubls
});

export default connect(
  mapStateToProps,
  { getBublPosts, addPost, getUserInfo, getSchoolBubls, joinBubl, leaveBubl }
)(PostList);
