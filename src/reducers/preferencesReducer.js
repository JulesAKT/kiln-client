import {
  EDIT_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_SUCCESS,
} from "../actions/types";

const preferencesReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PREFERENCES_SUCCESS:
    case FETCH_PREFERENCES_SUCCESS:
      console.log("FETCH_PREFERENCES_SUCCESS:");
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};

export default preferencesReducer;
