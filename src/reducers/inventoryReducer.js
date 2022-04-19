import _ from "lodash";

import {
  CREATE_INVENTORY_ITEM_SUCCESS,
  EDIT_INVENTORY_ITEM_SUCCESS,
  FETCH_INVENTORY_ITEMS_SUCCESS,
  FETCH_INVENTORY_ITEM_SUCCESS,
  DELETE_INVENTORY_ITEM_SUCCESS,
} from "../actions/types";

const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_INVENTORY_ITEM_SUCCESS:
    case EDIT_INVENTORY_ITEM_SUCCESS:
    case FETCH_INVENTORY_ITEM_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_INVENTORY_ITEMS_SUCCESS:
      return { ..._.mapKeys(action.payload, "id") };
    case DELETE_INVENTORY_ITEM_SUCCESS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default projectReducer;
