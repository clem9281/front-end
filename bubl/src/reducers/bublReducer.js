import {
  // GET USER INFO
  GETSCHOOLBUBLS_START,
  GETSCHOOLBUBLS_SUCCESS,
  GETSCHOOLBUBLS_FAILURE,
  GETBUBLPOSTS_START,
  GETBUBLPOSTS_SUCCESS,
  GETBUBLPOSTS_FAILURE,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  JOINBUBL_START,
  JOINBUBL_SUCCESS,
  JOINBUBL_FAILURE,
  LEAVEBUBL_START,
  LEAVEBUBL_SUCCESS,
  LEAVEBUBL_FAILURE
} from "../actions";

const initialState = {
  // loading checkers
  gettingSchoolBubls: false,
  gettingBublPosts: false,
  joiningBubl: false,
  leavingBubl: false,
  // data
  allSchoolBubls: null,
  bublPosts: null,
  addPostError: null,
  joinBublError: null,
  leaveBublError: null,
  error: null
};
const bublReducer = (state = initialState, action) => {
  switch (action.type) {
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

    // GET POSTS FOR BUBL
    case GETBUBLPOSTS_START:
      return {
        ...state,
        gettingBublPosts: true
      };
    case GETBUBLPOSTS_SUCCESS:
      return {
        ...state,
        error: null,
        gettingBublPosts: false,
        bublPosts: action.payload
      };
    case GETBUBLPOSTS_FAILURE:
      return {
        ...state,
        error: true,
        gettingBublPosts: false,
        bublPosts: null
      };

    // JOIN BUBL
    case JOINBUBL_START:
      return {
        ...state,
        joiningBubl: true
      };
    case JOINBUBL_SUCCESS:
      return {
        ...state,
        joiningBubl: false,
        joinBublError: null
      };
    case JOINBUBL_FAILURE:
      return {
        ...state,
        joiningBubl: false,
        joinBublError: true
      };

    // LEAVE BUBL
    case LEAVEBUBL_START:
      return {
        ...state,
        leavingBubl: true
      };
    case LEAVEBUBL_SUCCESS:
      return {
        ...state,
        leavingBubl: false,
        leaveBublError: false
      };
    case LEAVEBUBL_FAILURE:
      return {
        ...state,
        leavingBubl: false,
        leaveBublError: true
      };

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
    default:
      return state;
  }
};

export default bublReducer;
