import {
  FETCH_BARTLETT_STATUS_SUCCESS,
  BARTLETT_SIGN_IN_SUCCESS,
} from "../actions/types";

const bartlettReducer = (state = {}, action) => {
  switch (action.type) {
    case BARTLETT_SIGN_IN_SUCCESS:
      return {
        ...state,
        session: action.payload.authentication_token,
        controller_ids: action.payload.controller_ids,
        controller_names: action.payload.controller_names,
        auth_status: action.payload.status,
      };
    case FETCH_BARTLETT_STATUS_SUCCESS:
      // Take array of kilns, and index them by serial_number
      return {
        ...state,
        ...{
          kilns: action.payload.kilns.reduce(
            (acc, kiln) => ({ ...acc, [kiln.serial_number]: kiln }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};

export default bartlettReducer;
