import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// actions
import { updatePost, clearUpdatedPost } from "../actions";

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateInfo: {
        user_id: "",
        post_content: "",
        bubbles: []
      }
    };
  }
  componentDidMount() {
    // you need an array of the bubl ids for the put request
    console.log("UPDATE FORM", this.props);
    const bubbleIdsArray = this.props.bubbles.map(bubble => bubble.id);
    // if there is updated post information use that, else get the info thats passed down from props
    console.log(2, bubbleIdsArray);
    const postContent = this.props.updatedPost
      ? this.props.updatedPost.post_content
      : this.props.postContent;
    this.setState({
      updateInfo: {
        bubbles: bubbleIdsArray,
        user_id: this.props.userInfo.id,
        post_content: postContent
      }
    });
  }
  handleChange = e => {
    this.setState({
      updateInfo: {
        ...this.state.updateInfo,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = (e, id) => {
    e.preventDefault();
    console.log("GOING IN PUT REQUEST", this.state.updateInfo);
    this.props
      .updatePost(id, this.state.updateInfo)
      .then(() => {
        this.props.showForm(e);
      })
      .then(() =>
        this.props.updatePostContent(this.props.updatedPost.post_content)
      )
      .then(() => this.props.clearUpdatedPost());
  };
  render() {
    console.log(this.state.updateInfo);
    return (
      <section className="update-form">
        <div className="container">
          <form onSubmit={e => this.handleSubmit(e, this.props.postId)}>
            <button
              className="cancel-update"
              type="button"
              onClick={this.props.showForm}
            >
              <i className="fas fa-times" />
            </button>
            <label htmlFor="name">Update Post</label>
            <textarea
              type="text"
              name="post_content"
              value={this.state.updateInfo.post_content}
              onChange={this.handleChange}
              placeholder="Post"
              max-length="256"
              cols="40"
              rows="5"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
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
    { updatePost, clearUpdatedPost }
  )(UpdateForm)
);
