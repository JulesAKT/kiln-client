//import * as firebase from "firebase";
import { store } from "../store";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import history from "../history";
//const testfirebase = require("@firebase/testing");

export const fbConfig = {
  apiKey: "AIzaSyD7s_UHLUN4gyxuN_KVoDLYXsHh_JLdBGs",
  authDomain: "kilnhelper.firebaseapp.com",
  databaseURL: "https://kilnhelper.firebaseio.com/",
  //databaseURL: "http://localhost:9000/?ns=kilnhelper",
  projectId: "kilnhelper",
  storageBucket: "kilnhelper.appspot.com",
  messagingSenderId: "sender-id",
  appId: "kilnhelper",
  measurementId: "G-measurement-id",
};

export const testfbConfig = {
  apiKey: "AIzaSyAT41x4y0pyBhPCLAl7XH7KIlexsZh_rUQ",
  authDomain: "kilnhelper-test.firebaseapp.com",
  databaseName: "kilnhelper-test",
  databaseURL: "https://kilnhelper-test.firebaseio.com/",
  projectId: "kilnhelper-test",
  storageBucket: "kilnhelper_test.appspot.com",
  messagingSenderId: "sender-id",
  appId: "kilnhelper",
  measurementId: "G-measurement-id",
};

export const rrfConfig = { userProfile: "users" };

//console.log("My_Firebase");
//console.log(my_firebase);
let Firebase;

if (!firebase.apps.length) {
  if (typeof jest === "undefined") {
    //console.log("Initialised Production Firebase");
    Firebase = firebase.initializeApp(fbConfig);
    //console.log(firebase.app().name);
  } else {
    //console.log("Initialised Test firebase");
    Firebase = firebase.initializeApp(testfbConfig);
    //console.log(my_firebase.app().name);
    //console.log(testfirebase.app().name);
  }
}

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export const db = Firebase.database();
export const cloudstore = typeof jest === "undefined" && Firebase.storage();

// *** Kiln API

//export const firebase_kiln = (uid) => db.ref(`kilns/${uid}`);
//export const firebase_kilns = () => db.ref("kilns");

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(() => {
      console.log("Logged in!");
      history.push("/projects");
    })
    .catch((e) => console.log("Error: ", e?.message));
};

const appleProvider = new firebase.auth.OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");
export const signInWithApple = () => {
  firebase
    .auth()
    .signInWithPopup(appleProvider)
    .then(() => {
      console.log("Logged in!");
      history.push("/projects");
    })
    .catch((e) => console.log("Error: ", e?.message));
};

export default Firebase;
