import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import bublReducer from "./bublReducer";
import postReducer from "./postReducer";

import {
  //TOGGLE MENU
  TOGGLE_MENU,
  CLOSE_MENU,

  // JOIN BUBL
  // JOINBUBL_START,
  // JOINBUBL_SUCCESS,
  // JOINBUBL_FAILURE,

  // // LEAVE BUBL
  // LEAVEBUBL_START,
  // LEAVEBUBL_SUCCESS,
  // LEAVEBUBL_FAILURE,

  // // ADD COMMENT
  // ADD_COMMENT_START,
  // ADD_COMMENT_SUCCESS,
  // ADD_COMMENT_FAILURE,

  // // REMOVE COMMENT
  // REMOVE_COMMENT_START,
  // REMOVE_COMMENT_SUCCESS,
  // REMOVE_COMMENT_FAILURE,

  // CLEAR UPDATED POST
  CLEAR_UPDATED_POST

  // CLEAR ERROR
  // CLEAR_ERROR
} from "../actions";

const initialState = {
  // loading checkers
  isLoading: false,

  gettingSchoolBubls: false,
  addingPost: false,
  deletingPost: false,
  commentLoading: false,
  updatingPost: false,
  gettingBublPosts: false,

  gettingUserPosts: false,
  // view

  menuOpen: false,

  // data

  allSchoolBubls: null,
  bublPosts: null,

  error: null,
  addPostError: null,
  userPosts: null,

  deletePostError: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: !state.menuOpen
      };
    case CLOSE_MENU:
      return {
        ...state,
        menuOpen: false
      };

    // ADD COMMENT
    // case ADD_COMMENT_START:
    //   return {
    //     ...state,
    //     commentLoading: true,
    //     error: null
    //   };
    // case ADD_COMMENT_SUCCESS:
    //   return {
    //     ...state,
    //     commentLoading: false,
    //     error: null
    //   };
    // case ADD_COMMENT_FAILURE:
    //   return {
    //     ...state,
    //     commentLoading: false,
    //     error: true
    //   };

    // // DELETE COMMENT
    // case REMOVE_COMMENT_START:
    //   return {
    //     ...state,
    //     commentLoading: true,
    //     error: null
    //   };
    // case REMOVE_COMMENT_SUCCESS:
    //   return {
    //     ...state,
    //     commentLoading: false,
    //     error: null
    //   };
    // case REMOVE_COMMENT_FAILURE:
    //   return {
    //     ...state,
    //     commentLoading: false,
    //     error: true
    //   };

    // CLEAR THE UPDATED POST
    case CLEAR_UPDATED_POST:
      return {
        ...state,
        updatedPost: null
      };

    default:
      return state;
  }
};

export default combineReducers({
  mainReducer,
  loginState: loginReducer,
  userState: userReducer,
  bublState: bublReducer,
  postState: postReducer
});
