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
import sharedProjectReducer from "./sharedProjectReducer";
import sharedFiringReducer from "./sharedFiringReducer";
import sharedSegmentReducer from "./sharedSegmentReducer";
import preferencesReducer from "./preferencesReducer";
import inventoryReducer from "./inventoryReducer";
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
  shared_projects: any;
  shared_firings: any;
  shared_segments: any;
  inventory: any;
  preferences: any;
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
  shared_projects: sharedProjectReducer,
  shared_firings: sharedFiringReducer,
  shared_segments: sharedSegmentReducer,
  inventory: inventoryReducer,
  preferences: preferencesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
