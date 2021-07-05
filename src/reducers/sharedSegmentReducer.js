import _ from "lodash";

import {
  CREATE_SHARED_SEGMENT_SUCCESS,
  FETCH_SHARED_SEGMENTS_SUCCESS,
  FETCH_SHARED_SEGMENT_SUCCESS,
  FETCH_SHARED_SEGMENTS_BY_FIRING_SUCCESS,
  FETCH_SHARED_SEGMENTS_BY_PROJECT_SUCCESS,
  EDIT_SHARED_SEGMENT_SUCCESS,
} from "../actions/types";

const sharedSegmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHARED_SEGMENT_SUCCESS:
    case EDIT_SHARED_SEGMENT_SUCCESS:
    case FETCH_SHARED_SEGMENT_SUCCESS:
      return {
        ...state,
        [action.payload.sharing_user_uid]: {
          ...state[action.payload.sharing_user_uid],
          [action.payload.segment.id]: action.payload.segment,
        },
      };
    case FETCH_SHARED_SEGMENTS_SUCCESS:
      return {
        ...state,
        [action.payload.sharing_user_uid]: {
          ...state[action.payload.sharing_user_uid],
          ..._.mapKeys(action.payload.segments, "id"),
        },
      };
    case FETCH_SHARED_SEGMENTS_BY_FIRING_SUCCESS:
      return {
        ...state,
        [action.payload.sharing_user_uid]: {
          ..._.omitBy(
            state[action.payload.sharing_user_uid],
            (segment) => segment.firing_id === action.payload.firing_id
          ),
          ..._.mapKeys(action.payload.segments, "id"),
        },
      };
    default:
      return state;
  }
};

export default sharedSegmentReducer;
