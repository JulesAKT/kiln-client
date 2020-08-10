import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_VERIFIED_SUCCESS,
} from "../actions/types";

//let initialToken = JSON.parse(localStorage.getItem("token"));

const initialState = {
  loggingIn: false,
  loggedIn: false,
  //loggedIn: initialToken ? true : false,
  //token: initialToken
  token: null,
};

export function authentication(state = initialState, action) {
  //console.log("Reducer called " + action.type);
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      //console.log("Signing in");
      //console.log(action.payload);
      //localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        loggingIn: false,
        loggedIn: true,
        email: action.payload.user.email,
        uid: action.payload.user.uid,
        verified: false,
      };
    case SIGN_OUT_SUCCESS:
      //console.log("Logging out (Reducer)");
      //localStorage.setItem("token", null);
      return {
        loggingIn: false,
        loggedIn: false,
        email: null,
        uid: null,
        verified: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: false,
        email: null,
        uid: null,
        verified: false,
      };
    case SIGN_UP_VERIFIED_SUCCESS:
      //console.log("SIGN_UP_VERIFIED reducer called!");
      return {
        loggingIn: false,
        loggedIn: false,
        email: null,
        uid: null,
        verified: true,
      };

    default:
      return state;
    /*
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
      */
  }
}
