import _ from "lodash";

import {
  CREATE_SEGMENT_SUCCESS,
  FETCH_SEGMENTS_SUCCESS,
  FETCH_SEGMENT_SUCCESS,
  FETCH_SEGMENTS_BY_FIRING_SUCCESS,
  FETCH_SEGMENTS_BY_PROJECT_SUCCESS,
  EDIT_SEGMENT_SUCCESS,
  DELETE_SEGMENT_SUCCESS,
} from "../actions/types";

const SegmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SEGMENT_SUCCESS:
    case EDIT_SEGMENT_SUCCESS:
    case FETCH_SEGMENT_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_SEGMENTS_SUCCESS:
      return { ..._.mapKeys(action.payload, "id") };
    case FETCH_SEGMENTS_BY_FIRING_SUCCESS:
      return {
        ..._.omitBy(state, (segment) => segment.firing_id === action.id),
        ..._.mapKeys(action.payload, "id"),
      };
    case FETCH_SEGMENTS_BY_PROJECT_SUCCESS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_SEGMENT_SUCCESS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default SegmentReducer;
