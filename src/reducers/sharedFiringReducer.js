import _ from "lodash";

import {
  CREATE_SHARED_FIRING_SUCCESS,
  FETCH_SHARED_FIRINGS_SUCCESS,
  FETCH_SHARED_FIRING_SUCCESS,
  EDIT_SHARED_FIRING_SUCCESS,
  DELETE_SHARED_FIRING_SUCCESS,
} from "../actions/types";

const sharedFiringReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHARED_FIRING_SUCCESS:
    case EDIT_SHARED_FIRING_SUCCESS:
    case FETCH_SHARED_FIRING_SUCCESS:
      return {
        ...state,
        [action.payload.sharing_user_uid]: {
          [action.payload.firing.id]: action.payload.firing,
        },
      };
    default:
      return state;
  }
};

export default sharedFiringReducer;
