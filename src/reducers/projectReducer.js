import _ from "lodash";

import {
  CREATE_PROJECT_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
} from "../actions/types";

const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
    case EDIT_PROJECT_SUCCESS:
    case FETCH_PROJECT_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_PROJECTS_SUCCESS:
      return { ..._.mapKeys(action.payload, "id") };
    case DELETE_PROJECT_SUCCESS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default projectReducer;
