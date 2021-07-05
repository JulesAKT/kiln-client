import _ from "lodash";

import {
  CREATE_SHARED_PROJECT_SUCCESS,
  FETCH_SHARED_PROJECTS_SUCCESS,
  FETCH_SHARED_PROJECTS_BY_KILN_SUCCESS,
  FETCH_SHARED_PROJECT_SUCCESS,
  EDIT_SHARED_PROJECT_SUCCESS,
} from "../actions/types";

const sharedProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHARED_PROJECT_SUCCESS:
    case EDIT_SHARED_PROJECT_SUCCESS:
    case FETCH_SHARED_PROJECT_SUCCESS:
      return {
        ...state,
        [action.payload.sharing_user_uid]: {
          ...state[action.payload.sharing_user_uid],
          [action.payload.project.id]: action.payload.project,
        },
      };
    case FETCH_SHARED_PROJECTS_SUCCESS:
      return {
        ...state,
        [action.payload.sharing_user_uid]: {
          ...state[action.payload.sharing_user_uid],
          ..._.mapKeys(action.payload.projects, "id"),
        },
      };
    default:
      return state;
  }
};

export default sharedProjectReducer;
