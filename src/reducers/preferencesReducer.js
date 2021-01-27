import {
  EDIT_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_SUCCESS,
} from "../actions/types";

const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PREFERENCES_SUCCESS:
    case FETCH_PREFERENCES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default projectReducer;
