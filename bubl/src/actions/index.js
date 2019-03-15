import axios from "axios";

// MENU OPEN
export const TOGGLE_MENU = "TOGGLE_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

export const toggleMenu = () => dispatch => {
  dispatch({ type: TOGGLE_MENU });
};
export const closeMenu = () => dispatch => {
  dispatch({ type: CLOSE_MENU });
};

// LOGIN
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginStart = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://build-week-bubl.herokuapp.com/auth/login", creds)
    .then(res => {
      localStorage.setItem("userToken", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
    })
    .catch(err =>
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message })
    );
};

// GET SCHOOLS
export const GETSCHOOLS_START = "GETSCHOOLS_START";
export const GETSCHOOLS_SUCCESS = "GETSCHOOLS_SUCCESS";
export const GETSCHOOLS_FAILURE = "GETSCHOOLS_FAILURE";

export const getSchoolsStart = info => dispatch => {
  dispatch({ type: GETSCHOOLS_START });
  return axios
    .get("https://build-week-bubl.herokuapp.com/api/schools", info)
    .then(res => dispatch({ type: GETSCHOOLS_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: GETSCHOOLS_FAILURE }));
};

// SIGN UP
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const signUpStart = info => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axios
    .post("https://build-week-bubl.herokuapp.com/auth/register", info)
    .then(res => dispatch({ type: SIGNUP_SUCCESS }))
    .catch(err =>
      dispatch({ type: SIGNUP_FAILURE, payload: err.response.data.message })
    );
};

// GET USER POSTS
export const GETPOSTS_START = "GETPOSTS_START";
export const GETPOSTS_SUCCESS = "GETPOSTS_SUCCESS";
export const GETPOSTS_FAILURE = "GETPOSTS_FAILURE";

export const getPostsStart = () => dispatch => {
  dispatch({ type: GETPOSTS_START });
  return axios
    .get("https://build-week-bubl.herokuapp.com/api/posts", {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETPOSTS_SUCCESS, payload: res.data }))
    .catch(() => dispatch({ type: GETPOSTS_FAILURE }));
};

// GET USER INFO
export const GETUSERINFO_START = "GETUSERINFO_START";
export const GETUSERINFO_SUCCESS = "GETUSERINFO_SUCCESS";
export const GETUSERINFO_FAILURE = "GETUSERINFO_FAILURE";

export const getUserInfo = () => dispatch => {
  dispatch({ type: GETUSERINFO_START });
  return axios
    .get("https://build-week-bubl.herokuapp.com/api/users/me", {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({ type: GETUSERINFO_SUCCESS, payload: res.data });
    })
    .catch(() =>
      dispatch({
        type: GETUSERINFO_FAILURE
      })
    );
};

// GET POSTS FOR BUBL
export const GETBUBLPOSTS_START = "GETBUBLPOSTS_START";
export const GETBUBLPOSTS_SUCCESS = "GETBUBLPOSTS_SUCCESS";
export const GETBUBLPOSTS_FAILURE = "GETBUBLPOSTS_FAILURE";

export const getBublPosts = id => dispatch => {
  dispatch({ type: GETBUBLPOSTS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/posts/filter/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETBUBLPOSTS_SUCCESS, payload: res.data }))
    .catch(() =>
      dispatch({
        type: GETBUBLPOSTS_FAILURE
      })
    );
};

// GET BUBLS FOR SCHOOL
export const GETSCHOOLBUBLS_START = "GETSCHOOLBUBLS_START";
export const GETSCHOOLBUBLS_SUCCESS = "GETSCHOOLBUBLS_SUCCESS";
export const GETSCHOOLBUBLS_FAILURE = "GETSCHOOLBUBLS_FAILURE";

export const getSchoolBubls = () => dispatch => {
  dispatch({ type: GETSCHOOLBUBLS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/bubbles`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({ type: GETSCHOOLBUBLS_SUCCESS, payload: res.data });
    })
    .catch(() =>
      dispatch({
        type: GETSCHOOLBUBLS_FAILURE
      })
    );
};

// JOIN BUBL
export const JOINBUBL_START = "JOINBUBL_START";
export const JOINBUBL_SUCCESS = "JOINBUBL_SUCCESS";
export const JOINBUBL_FAILURE = "JOINBUBL_FAILURE";

export const joinBubl = id => dispatch => {
  dispatch({ type: JOINBUBL_START });
  return axios
    .post(
      `https://build-week-bubl.herokuapp.com/api/bubbles/join/${id}`,
      null,
      {
        headers: {
          Authorization: localStorage.getItem("userToken")
        }
      }
    )
    .then(res => dispatch({ type: JOINBUBL_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: JOINBUBL_FAILURE,
        payload: err.response.data.message
      })
    );
};

// LEAVE A BUBL
export const LEAVEBUBL_START = "LEAVEBUBL_START";
export const LEAVEBUBL_SUCCESS = "LEAVEBUBL_SUCCESS";
export const LEAVEBUBL_FAILURE = "LEAVEBUBL_FAILURE";

export const leaveBubl = id => dispatch => {
  dispatch({ type: LEAVEBUBL_START });
  return axios
    .delete(
      `https://build-week-bubl.herokuapp.com/api/bubbles/leave/${id}`,

      {
        headers: {
          Authorization: localStorage.getItem("userToken")
        }
      }
    )
    .then(res => dispatch({ type: LEAVEBUBL_SUCCESS, payload: res.data }))
    .catch(() =>
      dispatch({
        type: LEAVEBUBL_FAILURE
      })
    );
};

// ADD A POST
export const ADD_POST_START = "ADD_POST_START";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const addPost = newPost => dispatch => {
  dispatch({ type: ADD_POST_START });
  return axios
    .post(`https://build-week-bubl.herokuapp.com/api/posts`, newPost, {
      headers: { Authorization: localStorage.getItem("userToken") }
    })
    .then(res => dispatch({ type: ADD_POST_SUCCESS, payload: res.data }))
    .catch(() => dispatch({ type: ADD_POST_FAILURE }));
};

// ADD A COMMENT
export const ADD_COMMENT_START = "ADD_COMMENT_START";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addComment = newComment => dispatch => {
  dispatch({ type: ADD_COMMENT_START });
  return axios
    .post(`https://build-week-bubl.herokuapp.com/api/comments`, newComment, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: ADD_COMMENT_SUCCESS, payload: res.data }))
    .catch(() =>
      dispatch({
        type: ADD_COMMENT_FAILURE
      })
    );
};

// REMOVE A COMMENT
export const REMOVE_COMMENT_START = "REMOVE_COMMENT_START";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const removeComment = id => dispatch => {
  dispatch({ type: REMOVE_COMMENT_START });
  return axios
    .delete(`https://build-week-bubl.herokuapp.com/api/comments/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: REMOVE_COMMENT_SUCCESS, payload: res.data }))
    .catch(() =>
      dispatch({
        type: REMOVE_COMMENT_FAILURE
      })
    );
};
// REMOVE A POST
export const DELETE_POST_START = "DELETE_POST_START";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const deletePost = id => dispatch => {
  dispatch({ type: DELETE_POST_START });
  return axios
    .delete(`https://build-week-bubl.herokuapp.com/api/posts/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(() => dispatch({ type: DELETE_POST_SUCCESS }))
    .catch(err => {
      dispatch({
        type: DELETE_POST_FAILURE,
        payload: err.response.data.message
      });
    });
};

// UPDATE A POST
export const UPDATE_POST_START = "UPDATE_POST_START";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const updatePost = (id, newInfo) => dispatch => {
  dispatch({ type: UPDATE_POST_START });
  return axios
    .put(`https://build-week-bubl.herokuapp.com/api/posts/${id}`, newInfo, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_POST_FAILURE,
        payload: err.response.data.message
      });
    });
};

// CLEAR UPDATED POST
export const CLEAR_UPDATED_POST = "CLEAR_UPDATED_POST";
// GET RID OF THE UPDATED POST ONCE IT'S USED
export const clearUpdatedPost = () => dispatch => {
  dispatch({ type: CLEAR_UPDATED_POST });
};

// CLEAR ERROR
export const CLEAR_ERROR = "CLEAR_ERROR";
// GET RID OF THE ERROR
export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

// LOG OUT
export const LOG_OUT = "LOG_OUT";

export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT });
  return localStorage.clear();
};
