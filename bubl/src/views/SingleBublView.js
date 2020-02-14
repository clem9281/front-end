import React from "react";
import { connect } from "react-redux";
// actions
import {
  addPost,
  getUserInfo,
  getSchoolBubls,
  joinBubl,
  leaveBubl,
  getBublPosts,
  deletePost,
  addComment
} from "../actions";
// components
import {
  Post,
  FullPageLoader,
  MainError,
  BlockLoader,
  BlockError
} from "../components";

class PostList extends React.Component {
  state = {
    postData: {
      post_content: "",
      bubbles: ""
    }
  };

  componentDidMount() {
    // get the posts
    this.props.getBublPosts(this.props.match.params.id);

    // if the user info doesn't exist on the store, get it
    if (!this.props.userInfo) {
      this.props.getUserInfo();
    }

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
    e.persist();

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
    const newData = {
      ...this.state.postData,
      user_id: this.props.userInfo.id
    };
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
      if (!this.props.error) {
        this.props.history.push("/bubls");
      }
    });
  };
  // getData is called from the post component
  getData = id => {
    // if params.id is undefined get the user data, else get the bubl post data. Params.id would be undefined if this component is rendered from the profile view

    this.props.getBublPosts(id);
  };
  render() {
    // if there is an error getting the bubl info load the error page
    if (this.props.error) {
      return <MainError text="Whoops, something went wrong." />;
    }
    // make sure all the data is here before moving on
    if (
      this.props.userInfo &&
      this.props.bublPosts &&
      this.props.allSchoolBubls
    ) {
      //   // get the bubble name, call it bubl
      const bubble = this.props.allSchoolBubls.filter(
        bubl => bubl.id === Number(this.props.match.params.id)
      )[0].bubble;
      //   // determine if user is a member of this bubl
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
            <Post
              post={post}
              key={post.id}
              user={this.props.userInfo}
              deletePost={this.props.deletePost}
              getBublPosts={this.props.getBublPosts}
              postState={this.props.postState}
              getData={this.getData}
              addComment={this.props.addComment}
            />
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

const mapStateToProps = ({ bublState, userState, postState }) => ({
  bublPosts: bublState.bublPosts,
  error: bublState.error,
  userInfo: userState.userInfo,
  allSchoolBubls: bublState.allSchoolBubls,
  isLoading: bublState.isLoading,
  addingPost: bublState.addingPost,
  addPostError: bublState.addPostError,
  gettingUserInfo: userState.gettingUserInfo,
  gettingSchoolBubls: bublState.gettingSchoolBubls,
  gettingBublPosts: bublState.gettingBublPosts,
  postState: postState
});

export default connect(mapStateToProps, {
  getBublPosts,
  addPost,
  getUserInfo,
  getSchoolBubls,
  joinBubl,
  leaveBubl,
  deletePost,
  addComment
})(PostList);
