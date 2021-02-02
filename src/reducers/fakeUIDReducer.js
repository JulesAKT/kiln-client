import { EDIT_FAKEUID_SUCCESS } from "../actions/types";

const fakeUIDReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_FAKEUID_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default fakeUIDReducer;
