import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
// actions
import {
  addComment,
  getBublPosts,
  removeComment,
  getUserInfo,
  removePost,
  getPostsStart
} from "../actions";
// components
import UpdateForm from "./UpdateForm";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        post_id: this.props.post.id,
        comment: ""
      },
      user: "",
      userId: "",
      showForm: false,
      postContent: ""
    };
  }
  componentDidMount() {
    // set the postContent to the post content passed down in props
    this.setState({
      ...this.state,
      postContent: this.props.post.post_content
    });
    // get the user info if it doesn't exist in the store, if it does exist in the store just set it to component state
    if (!this.props.userInfo) {
      this.props.getUserInfo().then(() =>
        this.setState({
          user: this.props.userInfo.name,
          userId: this.props.userInfo.id
        })
      );
    } else {
      this.setState({
        user: this.props.userInfo.name,
        userId: this.props.userInfo.id
      });
    }
  }
  // handle comment form change
  handleChange = e => {
    e.preventDefault();
    this.setState({
      newComment: {
        ...this.state.newComment,
        [e.target.name]: e.target.value
      }
    });
  };
  // handle add comment
  handleSubmit = e => {
    console.log(this.state.newComment);
    e.preventDefault();
    this.props
      .addComment(this.state.newComment)
      .then(() => {
        this.getData();
      })
      .then(() => {
        this.setState({
          newComment: {
            ...this.state.newComment,
            comment: ""
          }
        });
      });
  };
  // handle remove comment
  removeComment = (e, id) => {
    e.preventDefault();
    this.props.removeComment(id).then(() => {
      this.getData();
    });
  };
  // handle remove post
  removePost = (e, id) => {
    e.preventDefault();
    this.props.removePost(id).then(() => {
      this.getData();
    });
  };
  // this opens the update form
  handleClickUpdate = () => {
    this.setState({ showForm: !this.state.showForm });
  };
  // this is for update form to call to update the post in this component
  updatePostContent = content => {
    this.setState({ ...this.state, postContent: content });
  };
  // after adding or deleting a post or content we have to get the data again
  getData = () => {
    // if params.id is undefined get the user data, else get the bubl post data
    if (!this.props.match.params.id) {
      this.props.getPostsStart();
    } else {
      this.props.getBublPosts(this.props.post.bubbles[0].id);
    }
  };
  render() {
    const {
      post_content,
      updated_at,
      created_at,
      comments,
      name,
      user_id,
      id,
      bubbles
    } = this.props.post;
    // if there is an updated timestamp use that, otherwise use the created at timestamp
    const postTimestamp = updated_at
      ? moment(updated_at).fromNow()
      : moment(created_at).fromNow();
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
          {/* post owner name: when post is created from postlist it comes with a name property, so use that. if post is created from the userposts it doesn't have a name property, so use the current user's name */}
          <span className="name">{name ? name : this.props.userInfo.name}</span>

          {/* post content */}
          {this.state.postContent}

          {/* moment library to create a 'how long ago' timestamp */}
          <span className="timestamp">{postTimestamp}</span>

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
              {/* commenter name */}
              <span className="comment-user">{comment.name} </span>

              {/* comment content */}
              {comment.comment}

              {/* timestamp from moment */}
              <span className="timestamp">
                {moment(comment.created_at).fromNow()}
              </span>

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

        {/* add a comment form */}
        <form className="add-comment" onSubmit={this.handleSubmit}>
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

export default withRouter(
  connect(
    mapStateToProps,
    {
      addComment,
      getBublPosts,
      removeComment,
      getUserInfo,
      removePost,
      getPostsStart
    }
  )(Post)
);
