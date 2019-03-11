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
export const LOG_OUT = "LOG_OUT";

export const loginStart = () => dispatch => {};

export const logOut = () => dispatch => {
  dispatch({ type: LOG_OUT });
  return localStorage.clear();
};
