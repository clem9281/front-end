import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  addComment,
  getBublPosts,
  removeComment,
  getUserInfo,
  removePost
} from "../actions";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        post_id: "",
        comment: ""
      },
      user: ""
    };
  }
  componentDidMount() {
    // need the post id to add a new comment, set it here
    this.setState({
      newComment: {
        ...this.state.newComment,
        post_id: this.props.post.id
      }
    });
    // get the user info in case there have been any changes to ir
    this.props
      .getUserInfo()
      .then(() => this.setState({ user: this.props.userInfo.name }));
  }
  // handle form change
  handleChange = e => {
    e.preventDefault();
    this.setState({
      newComment: {
        ...this.state.newComment,
        [e.target.name]: e.target.value
      }
    });
  };
  // handle form submit
  handleSubmit = e => {
    e.preventDefault();
    this.props
      .addComment(this.state.newComment)
      .then(() => this.props.getBublPosts(this.props.post.bubbles[0].id))
      .then(() =>
        this.setState({
          newComment: {
            ...this.state.newComment,
            comment: ""
          }
        })
      );
  };
  // handle remove comment
  removeComment = (e, id) => {
    e.preventDefault();
    this.props
      .removeComment(id)
      .then(() => this.props.getBublPosts(this.props.post.bubbles[0].id));
  };
  // handle remove post
  removePost = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.removePost(id);
  };

  render() {
    const {
      post_content,
      updated_at,
      comments,
      likes,
      name,
      post,
      id
    } = this.props.post;
    return (
      <div className="post">
        <p className="post-content">
          <span className="name">{name} </span>
          {post_content}
          <span className="timestamp">{` ${moment(
            updated_at
          ).fromNow()}`}</span>
          <span className="delete-post" onClick={e => this.removePost(e, id)}>
            <i className="fas fa-trash-alt" />
          </span>
        </p>
        {comments &&
          comments.map(comment => (
            <p className="comment" key={comment.id}>
              <span className="comment-user">{comment.name}</span>
              {` ${comment.comment}`}
              <span className="timestamp">{` ${moment(
                comment.created_at
              ).fromNow()}`}</span>
              <span onClick={e => this.removeComment(e, comment.id)}>
                <i className="fas fa-trash-alt" />
              </span>
            </p>
          ))}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="comment"
            value={this.state.newComment.comment}
            onChange={this.handleChange}
          />
          <button>Add Comment</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ userInfo }) => ({
  userInfo
});

export default connect(
  mapStateToProps,
  { addComment, getBublPosts, removeComment, getUserInfo, removePost }
)(Post);
