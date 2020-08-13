import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { firebaseReducer } from "react-redux-firebase";
import projectReducer from "./projectReducer";
import kilnReducer from "./kilnReducer";
import { alert } from "./alertReducer";
import firingReducer from "./firingReducer";
import segmentReducer from "./segmentReducer";
import pendingReducer from "./pendingReducer";
import { authentication } from "./authReducer";

export default combineReducers({
  alert: alert,
  form: formReducer,
  projects: projectReducer,
  kilns: kilnReducer,
  firings: firingReducer,
  segments: segmentReducer,
  auth: authentication,
  firebase: firebaseReducer,
  pending: pendingReducer,
});
