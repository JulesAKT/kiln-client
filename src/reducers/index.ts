import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { firebaseReducer } from "react-redux-firebase";
import projectReducer from "./projectReducer";
import kilnReducer from "./kilnReducer";
import { alert } from "./alertReducer";
import firingReducer from "./firingReducer";
import segmentReducer from "./segmentReducer";
import pendingReducer from "./pendingReducer";
import { authentication } from "./authReducer";
import fakeUIDReducer from "./fakeUIDReducer";
import bartlettReducer from "./bartlettReducer";

interface IRootState {
  alert: any;
  form: any;
  auth: any;
  firebase: ReturnType<typeof firebaseReducer>;
  pending: any;
  projects: any;
  segments: any;
  firings: any;
  kilns: any;
  fakeUID: any;
  bartlett: ReturnType<typeof bartlettReducer>;
}

const rootReducer = combineReducers<IRootState>({
  alert: alert,
  form: formReducer,
  projects: projectReducer,
  kilns: kilnReducer,
  firings: firingReducer,
  segments: segmentReducer,
  auth: authentication,
  firebase: firebaseReducer,
  pending: pendingReducer,
  fakeUID: fakeUIDReducer,
  bartlett: bartlettReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
