import axios from "axios";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const GETPOSTS_START = "GETPOSTS_START";
export const GETPOSTS_SUCCESS = "GETPOSTS_SUCCESS";
export const GETPOSTS_FAILURE = "GETPOSTS_FAILURE";
export const GETUSERINFO_START = "GETUSERINFO_START";
export const GETUSERINFO_SUCCESS = "GETUSERINFO_SUCCESS";
export const GETUSERINFO_FAILURE = "GETUSERINFO_FAILURE";
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
export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT });
  return localStorage.clear();
};
