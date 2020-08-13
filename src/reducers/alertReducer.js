import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from "../actions/types";

export function alert(state = {}, action) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: "success",
        message: action.message,
      };
    case ALERT_ERROR:
      return {
        type: "error",
        message: action.message,
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}
