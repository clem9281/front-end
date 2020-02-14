import {
  // DELETE POST
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,

  // ADD COMMENT
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,

  // REMOVE COMMENT
  REMOVE_COMMENT_START,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,

  // UPDATE COMMENT
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,

  // CLEAR UPDATED POST
  CLEAR_UPDATED_POST
} from "../actions";

const initialState = {
  // loading checkers
  isLoading: false,
  addingPost: false,
  deletingPost: false,
  commentLoading: false,
  updatingPost: false,
  // data
  commentLoadingAtId: null,
  deletePostError: null,
  deletingPostId: null,
  addCommentError: null,
  updatePostError: null,
  removeCommentError: null,
  updatedPost: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // DELETE POST
    case DELETE_POST_START:
      return {
        ...state,
        deletingPost: true,
        deletingPostId: action.payload
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deletingPost: false,
        deletingPostId: null,
        deletePostError: null
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        deletingPost: false,
        deletePostError: true
      };

    // UPDATE POST
    case UPDATE_POST_START:
      return {
        ...state,
        updatingPost: true
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        updatingPost: false,
        updatedPost: action.payload,
        updatePostError: null
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        updatingPost: false,
        updatePostError: action.payload
      };

    // ADD COMMENT
    case ADD_COMMENT_START:
      return {
        ...state,
        commentLoading: true,
        commentLoadingAtId: action.payload
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        addCommentError: null,
        commentLoadingAtId: null
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        commentLoading: false,
        addCommentError: true
      };

    // DELETE COMMENT
    case REMOVE_COMMENT_START:
      return {
        ...state,
        commentLoading: true
      };
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        deleteCommentError: null
      };
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        commentLoading: false,
        deleteCommentError: true
      };

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

export default postReducer;
