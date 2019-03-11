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
  SIGNUP_SUCCESS
} from "../actions";

const initialState = {
  loggingIn: false,
  loggingOut: false,
  token: null,
  error: null
};

export const reducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state
      };
    case LOGIN_SUCCESS:
      return {
        ...state
      };
    case LOGIN_FAILURE:
      return {
        ...state
      };
    case SIGNUP_START:
      return {
        ...state
      };
    case SIGNUP_SUCCESS:
      return {
        ...state
      };
    case SIGNUP_FAILURE:
      return {
        ...state
      };
    case GETPOSTS_START:
      return {
        ...state
      };
    case GETPOSTS_SUCCESS:
      return {
        ...state
      };
    case GETPOSTS_FAILURE:
      return {
        ...state
      };
    case LOG_OUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
