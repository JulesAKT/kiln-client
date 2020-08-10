import _ from "lodash";

import {
  CREATE_KILN_SUCCESS,
  FETCH_KILN_SUCCESS,
  FETCH_KILNS_SUCCESS,
  EDIT_KILN_SUCCESS,
  DELETE_KILN_SUCCESS,
} from "../actions/types";

const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_KILN_SUCCESS:
    case EDIT_KILN_SUCCESS:
    case FETCH_KILN_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_KILNS_SUCCESS:
      return { ..._.mapKeys(action.payload, "id") };
    case DELETE_KILN_SUCCESS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default projectReducer;
