import {
  // GET USER INFO
  GETUSERINFO_START,
  GETUSERINFO_SUCCESS,
  GETUSERINFO_FAILURE,
  GETPOSTS_START,
  GETPOSTS_SUCCESS,
  GETPOSTS_FAILURE
} from "../actions";

const initialState = {
  // loading checkers
  gettingUserInfo: false,
  gettingUserPosts: false,
  // data
  userPosts: null,
  error: null,
  userInfo: null
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET USER POSTS
    case GETPOSTS_START:
      return {
        ...state,
        gettingUserPosts: true
      };

    case GETPOSTS_SUCCESS:
      return {
        ...state,
        gettingUserPosts: false,
        userPosts: action.payload,
        error: null
      };
    case GETPOSTS_FAILURE:
      return {
        ...state,
        gettingUserPosts: false,
        userPosts: null,
        error: action.payload
      };

    // GET USER INFO
    case GETUSERINFO_START:
      return {
        ...state,
        gettingUserInfo: true,
        error: null,
        userInfo: action.payload
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
        error: true
      };

    default:
      return state;
  }
};

export default userReducer;
