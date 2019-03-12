import {
  LOGIN_START,
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETPOSTS_FAILURE,
  GETPOSTS_START,
  GETPOSTS_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  GETUSERINFO_START,
  GETUSERINFO_SUCCESS,
  GETUSERINFO_FAILURE
} from "../actions";

const initialState = {
  loggingIn: false,
  loggingOut: false,
  signingUp: false,
  gettingPosts: false,
  gettingUserInfo: false,
  token: null,
  error: null,
  userPosts: null,
  userInfo: null
};

export const reducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.payload,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        token: null,
        error: action.payload
      };
    case SIGNUP_START:
      return {
        ...state,
        signingUp: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        error: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case GETPOSTS_START:
      return {
        ...state,
        gettingPosts: true
      };
    case GETPOSTS_SUCCESS:
      return {
        ...state,
        gettingPosts: false,
        userPosts: action.payload,
        error: null
      };
    case GETPOSTS_FAILURE:
      return {
        ...state,
        userPosts: null,
        gettingPosts: false,
        error: action.payload
      };
    case GETUSERINFO_START:
      return {
        ...state,
        gettingUserInfo: true
      };
    case GETUSERINFO_SUCCESS:
      return {
        ...state,
        gettingUserInfo: false,
        error: null,
        userInfo: action.payload
      };
    case GETUSERINFO_FAILURE:
      return {
        ...state,
        gettingUserInfo: false,
        user: null,
        error: action.payload
      };
    case LOG_OUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
