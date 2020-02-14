import {
  // LOGIN
  LOGIN_START,
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  // GET SCHOOLS
  GETSCHOOLS_START,
  GETSCHOOLS_SUCCESS,
  GETSCHOOLS_FAILURE,

  // SIGN UP
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,

  // CLEAR ERROR
  CLEAR_ERROR
} from "../actions";

const initialState = {
  // loading checkers
  loggingIn: false,
  loggingOut: false,
  gettingSchools: false,
  signingUp: false,
  // view
  signupSuccess: false,
  isLoggedIn: Boolean(localStorage.getItem("userToken")),
  // data
  schools: null,
  schoolsError: null,
  error: null
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: null,
        signupSuccess: false,
        isLoggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
        signupSuccess: false,
        isLoggedIn: false
      };
    // GET SCHOOLS
    case GETSCHOOLS_START:
      return {
        ...state,
        gettingSchools: true
      };
    case GETSCHOOLS_SUCCESS:
      return {
        ...state,
        gettingSchools: false,
        schools: action.payload,
        schoolsError: null
      };
    case GETSCHOOLS_FAILURE:
      return {
        ...state,
        gettingSchools: false,
        schoolError: true,
        schools: null
      };

    // SIGN UP
    case SIGNUP_START:
      return {
        ...state,
        signingUp: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        error: null,
        signupSuccess: true
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signingUp: false,
        error: action.payload,
        signupSuccess: false
      };

    // CLEAR ERROR
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        deletePostError: false
      };

    // LOG OUT
    case LOG_OUT:
      return {
        ...state,
        ...initialState,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
export default loginReducer;
