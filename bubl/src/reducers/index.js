import {
  LOGIN_START,
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETSCHOOLS_START,
  GETSCHOOLS_SUCCESS,
  GETSCHOOLS_FAILURE,
  GETPOSTS_FAILURE,
  GETPOSTS_START,
  GETPOSTS_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  GETUSERINFO_START,
  GETUSERINFO_SUCCESS,
  GETUSERINFO_FAILURE,
  GETBUBLPOSTS_START,
  GETBUBLPOSTS_SUCCESS,
  GETBUBLPOSTS_FAILURE,
  GETSCHOOLBUBLS_START,
  GETSCHOOLBUBLS_SUCCESS,
  GETSCHOOLBUBLS_FAILURE,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  CLEAR_ERROR
} from "../actions";

const initialState = {
  loggingIn: false,
  loggingOut: false,
  gettingSchools: false,
  signingUp: false,
  gettingPosts: false,
  gettingUserInfo: false,
  gettingBublPosts: false,
  gettingSchoolBubls: false,
  schools: null,
  allSchoolBubls: null,
  bublPosts: null,
  token: null,
  schoolsError: null,
  error: null,
  userPosts: null,
  userInfo: null,
  addingPost: false
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
        signingUp: false,
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
    case GETBUBLPOSTS_START:
      return {
        ...state,
        gettingBublPosts: true
      };
    case GETBUBLPOSTS_SUCCESS:
      return {
        ...state,
        gettingBublPosts: false,
        error: null,
        bublPosts: action.payload
      };
    case GETBUBLPOSTS_FAILURE:
      return {
        ...state,
        gettingBublPosts: false,
        error: action.payload,
        bublPosts: null
      };
    case GETSCHOOLBUBLS_START:
      return {
        ...state,
        gettingSchoolBubls: true
      };
    case GETSCHOOLBUBLS_SUCCESS:
      return {
        ...state,
        gettingSchoolBubls: false,
        allSchoolBubls: action.payload,
        error: null
      };
    case GETSCHOOLBUBLS_FAILURE:
      return {
        ...state,
        gettingSchoolBubls: false,
        allSchoolBubls: null,
        error: action.payload
      };
    // case ADD_POST_START:
    // return{
    //   ...state
    // };
    // case ADD_POST_SUCCESS:
    // return{
    //   ...state
    // };
    // case ADD_POST_FAILURE:
    // return{
    //   ...state
    // };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case LOG_OUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
