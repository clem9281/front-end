import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const GETSCHOOLS_START = "GETSCHOOLS_START";
export const GETSCHOOLS_SUCCESS = "GETSCHOOLS_SUCCESS";
export const GETSCHOOLS_FAILURE = "GETSCHOOLS_FAILURE";
export const GETPOSTS_START = "GETPOSTS_START";
export const GETPOSTS_SUCCESS = "GETPOSTS_SUCCESS";
export const GETPOSTS_FAILURE = "GETPOSTS_FAILURE";
export const GETUSERINFO_START = "GETUSERINFO_START";
export const GETUSERINFO_SUCCESS = "GETUSERINFO_SUCCESS";
export const GETUSERINFO_FAILURE = "GETUSERINFO_FAILURE";
export const GETSCHOOLBUBLS_START = "GETSCHOOLBUBLS_START";
export const GETSCHOOLBUBLS_SUCCESS = "GETSCHOOLBUBLS_SUCCESS";
export const GETSCHOOLBUBLS_FAILURE = "GETSCHOOLBUBLS_FAILURE";
export const GETBUBLPOSTS_START = "GETBUBLPOSTS_START";
export const GETBUBLPOSTS_SUCCESS = "GETBUBLPOSTS_SUCCESS";
export const GETBUBLPOSTS_FAILURE = "GETBUBLPOSTS_FAILURE";
// export const ADD_POST_START = "ADD_POST_START";
// export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
// export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const LOG_OUT = "LOG_OUT";

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

export const getSchoolsStart = info => dispatch => {
  dispatch({ type: GETSCHOOLS_START });
  return axios
    .get("https://build-week-bubl.herokuapp.com/api/schools", info)
    .then(res => dispatch({ type: GETSCHOOLS_SUCCESS, payload: res.data }))
    .catch(err => {
      console.error(err);
      dispatch({ type: GETSCHOOLS_FAILURE });
    });
};

export const signUpStart = info => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axios
    .post("https://build-week-bubl.herokuapp.com/auth/register", info)
    .then(res => dispatch({ type: SIGNUP_SUCCESS }))
    .catch(err =>
      dispatch({ type: SIGNUP_FAILURE, payload: err.response.data.message })
    );
};

export const getPostsStart = () => dispatch => {
  dispatch({ type: GETPOSTS_START });
  axios
    .get("https://build-week-bubl.herokuapp.com/api/posts", {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETPOSTS_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({ type: GETPOSTS_FAILURE, payload: err.response.data.message })
    );
};
export const getUserInfo = () => dispatch => {
  dispatch({ type: GETUSERINFO_START });
  axios
    .get("https://build-week-bubl.herokuapp.com/api/users/me", {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETUSERINFO_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GETUSERINFO_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const getBublPosts = id => dispatch => {
  dispatch({ type: GETBUBLPOSTS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/posts/filter/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => {
      console.log(res);
      dispatch({ type: GETBUBLPOSTS_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GETBUBLPOSTS_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const getSchoolBubls = () => dispatch => {
  dispatch({ type: GETSCHOOLBUBLS_START });
  return axios
    .get(`https://build-week-bubl.herokuapp.com/api/bubbles`, {
      headers: {
        Authorization: localStorage.getItem("userToken")
      }
    })
    .then(res => dispatch({ type: GETSCHOOLBUBLS_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GETSCHOOLBUBLS_FAILURE,
        payload: err.response.data.message
      })
    );
};
export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};
// export const addPost = newPost => dispatch => {
//   dispatch({ type: ADD_POST_START });
//   axios
//     .post("", newPost, {
//       headers: { Authorization: localStorage.getItem("userToken") }
//     })
//     .then(res => {
//       // dispatch({ type: ADD_POST_SUCCESS, payload: res.data})
//       console.log(res.data);
//     })
//     .catch(err => {
//       // dispatch({ type: ADD_POST_FAILURE})
//       console.log(err);
//     });
// };

export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT });
  return localStorage.clear();
};
