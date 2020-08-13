//import * as firebase from "firebase";
import { store } from "../store";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

export const fbConfig = {
  apiKey: "AIzaSyD7s_UHLUN4gyxuN_KVoDLYXsHh_JLdBGs",
  authDomain: "kilnhelper.firebaseapp.com",
  databaseURL: "https://kilnhelper.firebaseio.com/",
  projectId: "kilnhelper",
  storageBucket: "kilnhelper.appspot.com",
  messagingSenderId: "sender-id",
  appId: "kilnhelper",
  measurementId: "G-measurement-id",
};

export const rrfConfig = { userProfile: "users" };

let Firebase;

if (!firebase.apps.length) {
  Firebase = firebase.initializeApp(fbConfig);
}
export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export const db = firebase.database();
export const cloudstore = firebase.storage();

// *** Kiln API

//export const firebase_kiln = (uid) => db.ref(`kilns/${uid}`);
//export const firebase_kilns = () => db.ref("kilns");

export default Firebase;
