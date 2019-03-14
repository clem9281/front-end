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
import UpdateForm from "./UpdateForm";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        post_id: "",
        comment: ""
      },
      user: "",
      userId: "",
      showForm: false,
      postContent: ""
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
    // set the postContent to the post content passed down in props
    this.setState({
      ...this.state,
      postContent: this.props.post.post_content
    });
    // get the user info in case there have been any changes to it
    this.props.getUserInfo().then(() =>
      this.setState({
        user: this.props.userInfo.name,
        userId: this.props.userInfo.id
      })
    );
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
    this.props.removePost(id);
  };
  handleClickUpdate = () => {
    this.setState({ showForm: !this.state.showForm });
  };
  updatePostContent = content => {
    console.log("called");
    this.setState({ ...this.state, postContent: content });
  };
  render() {
    console.log(this.state);
    const {
      post_content,
      updated_at,
      comments,
      name,
      user_id,
      id,
      bubbles
    } = this.props.post;
    // if updating, show the form
    if (this.state.showForm) {
      return (
        <UpdateForm
          showForm={this.handleClickUpdate}
          postContent={post_content}
          postId={id}
          bubbles={bubbles}
          updatePostContent={this.updatePostContent}
        />
      );
    }
    return (
      <div className="post">
        <p className="post-content">
          <span className="name">{name} </span>
          {this.state.postContent}

          {/* moment library to create a 'how long ago' timestamp */}
          <span className="timestamp">{` ${moment(
            updated_at
          ).fromNow()}`}</span>

          {/* if the post belongs to the logged in user, display the delete and update post buttons */}
          {(this.state.user === name || this.state.userId === user_id) && (
            <>
              <button
                className="delete-post"
                onClick={e => this.removePost(e, id)}
              >
                <i className="fas fa-trash-alt" />
              </button>

              <button className="update-post" onClick={this.handleClickUpdate}>
                <i className="fas fa-edit" />
              </button>
            </>
          )}
        </p>
        {/* if the comments exist, map over them */}
        {comments &&
          comments.map(comment => (
            <p className="comment" key={comment.id}>
              <span className="comment-user">{comment.name}</span>
              {` ${comment.comment}`}
              <span className="timestamp">{` ${moment(
                comment.created_at
              ).fromNow()}`}</span>
              {/* if the comment belongs to the logged in user display the delete comment button */}
              {this.state.user === comment.name && (
                <button
                  className="delete-post"
                  onClick={e => this.removeComment(e, comment.id)}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              )}
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
const mapStateToProps = ({ userInfo, updatedPost }) => ({
  userInfo,
  updatedPost
});

export default connect(
  mapStateToProps,
  {
    addComment,
    getBublPosts,
    removeComment,
    getUserInfo,
    removePost
  }
)(Post);
