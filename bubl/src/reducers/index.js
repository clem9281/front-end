import {
  //TOGGLE MENU
  TOGGLE_MENU,
  CLOSE_MENU,

  // LOGIN
  LOGIN_START,
  LOG_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  // GET SCHOOLS
  GETSCHOOLS_START,
  GETSCHOOLS_SUCCESS,
  GETSCHOOLS_FAILURE,

  // GET USER POSTS
  GETPOSTS_FAILURE,
  GETPOSTS_SUCCESS,

  // SIGN UP
  SIGNUP_START,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,

  // GET USER INFO
  GETUSERINFO_SUCCESS,
  GETUSERINFO_FAILURE,

  // GET POSTS FOR BUBL
  GETBUBLPOSTS_SUCCESS,
  GETBUBLPOSTS_FAILURE,

  // GET SCHOOL BUBLS
  GETSCHOOLBUBLS_START,
  GETSCHOOLBUBLS_SUCCESS,
  GETSCHOOLBUBLS_FAILURE,

  // ADD POST
  ADD_POST_START,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,

  // JOIN BUBL
  JOINBUBL_START,
  JOINBUBL_SUCCESS,
  JOINBUBL_FAILURE,

  // LEAVE BUBL
  LEAVEBUBL_START,
  LEAVEBUBL_SUCCESS,
  LEAVEBUBL_FAILURE,

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
  CLEAR_UPDATED_POST,

  // CLEAR ERROR
  CLEAR_ERROR
} from "../actions";

const initialState = {
  // loading checkers
  isLoading: false,
  loggingIn: false,
  loggingOut: false,
  gettingSchools: false,
  signingUp: false,
  gettingSchoolBubls: false,
  addingPost: false,
  commentLoading: false,
  updatingPost: false,
  // view
  signupSuccess: false,
  menuOpen: false,
  // data
  schools: null,
  allSchoolBubls: null,
  bublPosts: null,
  schoolsError: null,
  error: null,
  addPostError: null,
  userPosts: null,
  userInfo: null
};

export const reducer = (state = initialState, action) => {
  console.log("reducer", action);
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
        signupSuccess: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
        signupSuccess: false
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

    // GET USER POSTS
    case GETPOSTS_SUCCESS:
      return {
        ...state,
        userPosts: action.payload,
        error: null
      };
    case GETPOSTS_FAILURE:
      return {
        ...state,
        userPosts: null,
        error: action.payload
      };

    // GET USER INFO
    case GETUSERINFO_SUCCESS:
      return {
        ...state,
        error: null,
        userInfo: action.payload
      };
    case GETUSERINFO_FAILURE:
      return {
        ...state,
        user: null,
        error: true
      };

    // GET POSTS FOR BUBL
    case GETBUBLPOSTS_SUCCESS:
      return {
        ...state,
        error: null,
        bublPosts: action.payload
      };
    case GETBUBLPOSTS_FAILURE:
      return {
        ...state,
        error: true,
        bublPosts: null
      };

    // GET BUBLS FOR SCHOOL
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
        error: true
      };

    // ADD POST
    case ADD_POST_START:
      return {
        ...state,
        addingPost: true
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        bublPosts: [...state.bublPosts, action.payload],
        addingPost: false,
        addPostError: null
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addingPost: false,
        addPostError: true
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
        error: null
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        updatingPost: false,
        error: action.payload
      };

    // JOIN BUBL
    case JOINBUBL_START:
      return {
        ...state,
        isLoading: true
      };
    case JOINBUBL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case JOINBUBL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    // LEAVE BUBL
    case LEAVEBUBL_START:
      return {
        ...state,
        isLoading: true
      };
    case LEAVEBUBL_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case LEAVEBUBL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    // ADD COMMENT
    case ADD_COMMENT_START:
      return {
        ...state,
        commentLoading: true,
        error: null
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        error: null
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        commentLoading: false,
        error: true
      };

    // DELETE COMMENT
    case REMOVE_COMMENT_START:
      return {
        ...state,
        commentLoading: true,
        error: null
      };
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLoading: false,
        error: null
      };
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        commentLoading: false,
        error: true
      };

    // CLEAR THE UPDATED POST
    case CLEAR_UPDATED_POST:
      return {
        ...state,
        updatedPost: null
      };

    // CLEAR ERROR
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    // LOG OUT
    case LOG_OUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
