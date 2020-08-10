import { ALERT_SUCCESS, ALERT_CLEAR, ALERT_ERROR } from "./types";

const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: ALERT_SUCCESS, message };
}

function error(message) {
  console.log("Error alertAction called");
  return { type: ALERT_ERROR, message };
}

function clear() {
  return { type: ALERT_CLEAR };
}

export default alertActions;
