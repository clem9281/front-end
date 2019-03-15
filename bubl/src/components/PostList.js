import React from "react";
import { connect } from "react-redux";
// actions
import {
  addPost,
  getUserInfo,
  getSchoolBubls,
  joinBubl,
  leaveBubl,
  getBublPosts
} from "../actions";
// reducer
import Post from "./Post";
import FullPageLoader from "./FullPageLoader";
import MainError from "./MainError";
import BlockLoader from "./BlockLoader";
import BlockError from "./BlockError";

class PostList extends React.Component {
  state = {
    postData: {
      user_id: "",
      post_content: "",
      bubbles: ""
    },
    error: false
  };

  componentDidMount() {
    // if the posts don't exist on the store, get them
    this.props.getBublPosts(this.props.match.params.id).then(() => {
      if (this.props.error) {
        this.setState({ error: true });
      }
    });

    // if the user info doesn't exist on the store, get it, set the userid on component state
    if (!this.props.userInfo) {
      this.props.getUserInfo().then(() => {
        if (this.props.error) {
          this.setState({ error: true });
        } else {
          this.setState({
            postData: {
              ...this.state.postData,
              user_id: this.props.userInfo.id
            }
          });
        }
      });
    }

    // if all the bubls don't exist on the store, get them
    if (!this.props.allSchoolBubls) {
      this.props.getSchoolBubls().then(() => {
        if (this.props.error) {
          this.setState({ error: this.props.error });
        }
      });
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

    const newData =
      this.state.postData.user_id === ""
        ? {
            ...this.state.postData,
            user_id: this.props.userInfo.id
          }
        : this.state.postData;
    this.props.addPost(newData).then(() =>
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
    this.props.joinBubl(id).then(() => {
      if (this.props.error) {
        this.setState({ error: true });
      } else {
        this.props.getUserInfo();
      }
    });
  };
  // handle clicking leave, after leave navigate back to bubls page
  handleLeave = (e, id) => {
    e.preventDefault();
    this.props.leaveBubl(id).then(() => {
      if (this.props.error) {
        this.setState({ error: true });
      } else {
        this.props.history.push("/bubls");
      }
    });
  };
  render() {
    // if there is an error load the error page
    if (this.state.error) {
      return <MainError text="Whoops, something went wrong." />;
    }
    // this is basically just for joining or leaving a bubble
    if (this.props.isLoading) {
      return <FullPageLoader />;
    }
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
        <section className="post-list">
          {/* if the user is a member of this bubl, show the leave button, else show the join button */}
          <div className="title-container">
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
          </div>
          {/* map over the posts */}
          {this.props.bublPosts.map(post => (
            <Post post={post} key={post.id} />
          ))}
          {/* if we're adding a post show the loader, if there is an error show the error page */}
          {this.props.addingPost ? (
            <BlockLoader />
          ) : this.props.addPostError ? (
            <BlockError text="Sorry, we couldn't add a post at this time" />
          ) : (
            <form className="add-post" onSubmit={this.addPost}>
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
          )}
        </section>
      );
    }
    return <FullPageLoader />;
  }
}

const mapStateToProps = ({
  bublPosts,
  error,
  userInfo,
  allSchoolBubls,
  isLoading,
  addingPost,
  addPostError
}) => ({
  bublPosts,
  error,
  userInfo,
  allSchoolBubls,
  isLoading,
  addingPost,
  addPostError
});

export default connect(
  mapStateToProps,
  { getBublPosts, addPost, getUserInfo, getSchoolBubls, joinBubl, leaveBubl }
)(PostList);
