import _ from "lodash";

import {
  CREATE_FIRING_SUCCESS,
  FETCH_FIRINGS_SUCCESS,
  FETCH_FIRING_SUCCESS,
  EDIT_FIRING_SUCCESS,
  DELETE_FIRING_SUCCESS,
  FETCH_FIRINGS_BY_PROJECT_SUCCESS,
  FETCH_FIRINGS_BY_FAVOURITE_SUCCESS,
} from "../actions/types";

const FiringReducer = (state = {}, action) => {
  //console.log("FiringReducer: " + action.type);
  switch (action.type) {
    case CREATE_FIRING_SUCCESS:
    case EDIT_FIRING_SUCCESS:
    case FETCH_FIRING_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_FIRINGS_SUCCESS:
      return { ..._.mapKeys(action.payload, "id") };
    case FETCH_FIRINGS_BY_PROJECT_SUCCESS:
      //console.log(state);
      //const omitted_state = _.omitBy(state, (firing) => {
      //  return firing.project_id === action.id;
      //});
      //console.log(omitted_state);
      return {
        ..._.omitBy(state, (firing) => {
          return firing.project_id === action.id;
        }),
        ..._.mapKeys(action.payload, "id"),
      };
    case FETCH_FIRINGS_BY_FAVOURITE_SUCCESS:
      return {
        ..._.omitBy(state, (firing) => firing.favourite === true),
        ..._.mapKeys(action.payload, "id"),
      };
    case DELETE_FIRING_SUCCESS:
      console.log("Delete_Firing Reducer");
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default FiringReducer;
