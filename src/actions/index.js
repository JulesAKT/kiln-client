//import history from "../history";
import alertActions from "./alertActions";
import { stopSubmit } from "redux-form";
//import { exportDate } from "../helpers/dates";
//import NavigationService from "../NavigationService";
//import * as firebase from "firebase";
import Firebase, { db, cloudstore } from "../api/firebase";
//import { getFirebase } from "react-redux-firebase";

//import * as FileSystem from "expo-file-system";
import { store } from "../store";
import history from "../history";

import uuid from "react-uuid";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CREATE_PROJECT_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  EDIT_PROJECT_SUCCESS,
  CREATE_KILN_SUCCESS,
  FETCH_KILNS_SUCCESS,
  FETCH_KILN_SUCCESS,
  EDIT_KILN_SUCCESS,
  DELETE_KILN_SUCCESS,
  CREATE_FIRING_SUCCESS,
  FETCH_FIRINGS_SUCCESS,
  FETCH_FIRING_SUCCESS,
  FETCH_FIRINGS_BY_PROJECT_SUCCESS,
  FETCH_FIRINGS_BY_FAVOURITE_SUCCESS,
  EDIT_FIRING_SUCCESS,
  DELETE_FIRING_SUCCESS,
  CREATE_SEGMENT_SUCCESS,
  EDIT_SEGMENT_SUCCESS,
  FETCH_SEGMENT_SUCCESS,
  FETCH_SEGMENTS_SUCCESS,
  FETCH_SEGMENTS_BY_FIRING_SUCCESS,
  DELETE_SEGMENT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECT_REQUEST,
  EDIT_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  CREATE_KILN_REQUEST,
  FETCH_KILNS_REQUEST,
  FETCH_KILN_REQUEST,
  EDIT_KILN_REQUEST,
  DELETE_KILN_REQUEST,
  CREATE_FIRING_REQUEST,
  FETCH_FIRINGS_REQUEST,
  FETCH_FIRING_REQUEST,
  FETCH_FIRINGS_BY_PROJECT_REQUEST,
  FETCH_FIRINGS_BY_FAVOURITE_REQUEST,
  EDIT_FIRING_REQUEST,
  DELETE_FIRING_REQUEST,
  CREATE_SEGMENT_REQUEST,
  EDIT_SEGMENT_REQUEST,
  FETCH_SEGMENT_REQUEST,
  FETCH_SEGMENTS_REQUEST,
  FETCH_SEGMENTS_BY_FIRING_REQUEST,
  DELETE_SEGMENT_REQUEST,
  FETCH_PROJECTS_BY_KILN_REQUEST,
  FETCH_PROJECTS_BY_KILN_SUCCESS,
  EDIT_PREFERENCES_REQUEST,
  EDIT_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
  EDIT_USERDATA_REQUEST,
  EDIT_USERDATA_SUCCESS,
  EDIT_FAKEUID_SUCCESS,
  BARTLETT_SIGN_IN_SUCCESS,
  FETCH_BARTLETT_STATUS_SUCCESS,
  CREATE_SHARED_PROJECT_REQUEST,
  //  CREATE_SHARED_PROJECT_SUCCESS,
  CREATE_SHARED_FIRING_REQUEST,
  CREATE_SHARED_FIRING_SUCCESS,
  CREATE_SHARED_SEGMENT_REQUEST,
  CREATE_SHARED_SEGMENT_SUCCESS,
  FETCH_SHARED_SEGMENTS_BY_FIRING_REQUEST,
  FETCH_SHARED_SEGMENTS_BY_FIRING_SUCCESS,
  FETCH_SHARED_FIRING_REQUEST,
  FETCH_SHARED_FIRING_SUCCESS,
  FETCH_SHARED_PROJECTS_REQUEST,
  FETCH_SHARED_PROJECTS_SUCCESS,
  CREATE_INVENTORY_ITEM_REQUEST,
  CREATE_INVENTORY_ITEM_SUCCESS,
  EDIT_INVENTORY_ITEM_REQUEST,
  EDIT_INVENTORY_ITEM_SUCCESS,
  DELETE_INVENTORY_ITEM_REQUEST,
  DELETE_INVENTORY_ITEM_SUCCESS,
} from "./types";

import { bartkiln, bartlogin } from "../api/bartlett";

const UNKNOWN_ERROR = "Unknown Error";

// PROJECT Action Creators

export const createProject = (formProps) => async (dispatch, getState) => {
  //console.log(token);
  console.log(formProps);
  dispatch({ type: CREATE_PROJECT_REQUEST });
  formProps.id = uuid();

  const handleUpload = (photo, index) => {
    console.log("handleUpload - " + index);
    if (typeof photo.photo === "string") {
      console.log("Already uploaded - aborting");
      return null;
    }
    return new Promise((resolve, reject) => {
      console.log("Index: " + index);
      console.log(photo);

      const uploadName = userPath() + `/${formProps.id}-${index}.jpg`;
      cloudstore
        .ref(uploadName)
        .put(photo.photo[0])
        .then(
          () =>
            cloudstore
              .ref(uploadName)
              .getDownloadURL()
              .then((url) => {
                console.log(index + " " + url);
                formProps.photos[index].photo = url;
                resolve("Uploaded");
              })
          //            .catch(reject("Upload Failed"))
        )
        .catch((e) => console.log("Error", e.message));
    });
  };
  if (formProps.photos) {
    Promise.all(formProps.photos.map(handleUpload))
      .then((url, index) => {
        console.log("setting stuff");
        db.ref(userPath() + `/projects/${formProps.id}`).set({
          ...formProps,
        });
        dispatch({
          type: CREATE_PROJECT_SUCCESS,
          payload: { ...formProps },
        });
        history.goBack();
      })
      .catch((e) => console.log("Error", e.message));
  } else {
    db.ref(userPath() + `/projects/${formProps.id}`).set({
      ...formProps,
    });
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: { ...formProps },
    });
    history.goBack();
  }
};

export const fetchProjects = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_PROJECTS_REQUEST });
  //console.log("Reading from: " + userPath() + "/projects");
  db.ref(userPath() + "/projects").once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const fetchProjectsByKiln = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_PROJECTS_BY_KILN_REQUEST });
  //console.log("FetchProjectsByKiln");
  db.ref(userPath() + "/projects")
    .orderByChild("kiln")
    .equalTo(id)
    .once("value", (snapshot) => {
      //console.log("fetchProjectsByKiln returned");
      //console.log(snapshot.val());
      dispatch({
        type: FETCH_PROJECTS_BY_KILN_SUCCESS,
        payload: snapshot.val(),
        id: id,
      });
    });
};

export const fetchProject = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_PROJECT_REQUEST });
  db.ref(userPath() + `/projects/${id}`).once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_PROJECT_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const editProject =
  (id, formProps, ignoreNavigate = false) =>
  (dispatch, getState) => {
    console.log(formProps);
    dispatch({ type: EDIT_PROJECT_REQUEST, payload: { ...formProps } });
    formProps.id = id;
    const handleUpload = (photo, index) => {
      console.log("handleUpload - " + index);
      if (typeof photo.photo === "string") {
        console.log("Already uploaded - aborting");
        return null;
      }
      return new Promise((resolve, reject) => {
        console.log("Index: " + index);
        console.log(photo);

        const uploadName = userPath() + `/${formProps.id}-${index}.jpg`;
        cloudstore
          .ref(uploadName)
          .put(photo.photo)
          .then(
            () =>
              cloudstore
                .ref(uploadName)
                .getDownloadURL()
                .then((url) => {
                  console.log(index + " " + url);
                  formProps.photos[index].photo = url;
                  resolve("Uploaded");
                })
            //            .catch(reject("Upload Failed"))
          )
          .catch((e) => console.log("Error", e.message));
      });
    };
    if (formProps.photos) {
      Promise.all(formProps.photos.map(handleUpload))
        .then((url, index) => {
          console.log("setting stuff");
          db.ref(userPath() + `/projects/${formProps.id}`).set({
            ...formProps,
          });

          dispatch({
            type: EDIT_PROJECT_SUCCESS,
            payload: { ...formProps },
          });

          if (!ignoreNavigate) {
            history.goBack();
          }
        })
        .catch((e) => console.log("Error", e.message));
    } else {
      db.ref(userPath() + `/projects/${formProps.id}`).set({
        ...formProps,
      });

      dispatch({
        type: EDIT_PROJECT_SUCCESS,
        payload: { ...formProps },
      });

      if (!ignoreNavigate) {
        history.goBack();
      }
    }
  };

export const deleteProject = (id) => async (dispatch, getState) => {
  //const newName = FileSystem.documentDirectory + formProps.id + ".jpg";
  //FileSystem.deleteAsync(newName);
  dispatch({ type: DELETE_PROJECT_REQUEST });
  db.ref(userPath() + `/projects/${id}`).remove();
  dispatch({
    type: DELETE_PROJECT_REQUEST,
    payload: id,
  });
  history.push("/projects");
};

// KILNs Action Creators

export const createKiln = (formProps) => async (dispatch, getState) => {
  dispatch({ type: CREATE_KILN_REQUEST });
  //console.log(token);
  formProps.id = uuid();

  db.ref(userPath() + `/kilns/${formProps.id}`).set({
    ...formProps,
  });
  dispatch({
    type: CREATE_KILN_SUCCESS,
    payload: { ...formProps },
  });
  history.goBack();
};

export const fetchKilns = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_KILNS_REQUEST });
  db.ref(userPath() + "/kilns").once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_KILNS_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const fetchKiln = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_KILN_REQUEST });
  db.ref(userPath() + `/kilns/${id}`).once("value", (snapshot) => {
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_KILN_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const editKiln = (id, formProps) => async (dispatch, getState) => {
  dispatch({ type: EDIT_KILN_REQUEST });
  //console.log(`editKiln ID: ${id}`)
  formProps.id = id;
  db.ref(userPath() + `/kilns/${id}`).set({
    ...formProps,
  });

  dispatch({
    type: EDIT_KILN_SUCCESS,
    payload: { ...formProps },
  });
  history.goBack();
};

export const deleteKiln = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_KILN_REQUEST });
  db.ref(userPath() + `/kilns/${id}`).remove();
  dispatch({
    type: DELETE_KILN_SUCCESS,
    payload: id,
  });
  history.push("/kilns");
};

// FIRINGs Action Creators

export const createFiring =
  (formProps, allowNavigate = true) =>
  async (dispatch, getState) => {
    console.log("createFiring");
    console.log(formProps);
    dispatch({ type: CREATE_FIRING_REQUEST });
    if (!formProps.id) {
      formProps.id = uuid();
    }
    let newProps = { ...formProps };
    if (newProps?.date?.getMonth) {
      newProps.date = newProps.date.getTime();
    }

    db.ref(userPath() + `/firings/${formProps.id}`).set({
      ...newProps,
    });

    dispatch({
      type: CREATE_FIRING_SUCCESS,
      payload: { ...newProps },
    });
    if (allowNavigate) {
      history.goBack();
    }
  };

export const fetchFirings = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_FIRINGS_REQUEST });
  db.ref(userPath() + "/firings").once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_FIRINGS_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const fetchFiring = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_FIRING_REQUEST });
  db.ref(userPath() + `/firings/${id}`).once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_FIRING_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const fetchFiringsByProject = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_FIRINGS_BY_PROJECT_REQUEST });
  //console.log("FetchFiringsByProject");
  db.ref(userPath() + "/firings")
    .orderByChild("project_id")
    .equalTo(id)
    .once("value", (snapshot) => {
      //console.log("fetchFiringsByProject returned");
      //console.log(snapshot.val());
      dispatch({
        type: FETCH_FIRINGS_BY_PROJECT_SUCCESS,
        payload: snapshot.val(),
        id: id,
      });
    });
};

export const fetchFiringsByFavourite = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_FIRINGS_BY_FAVOURITE_REQUEST });
  db.ref(userPath() + "/firings")
    .orderByChild("favourite")
    .equalTo(true)
    .once("value", (snapshot) => {
      dispatch({
        type: FETCH_FIRINGS_BY_FAVOURITE_SUCCESS,
        payload: snapshot.val(),
      });
    });
};

export const editFiring =
  (id, formProps, allowNavigate = true) =>
  async (dispatch, getState) => {
    dispatch({ type: EDIT_FIRING_REQUEST });
    let newProps = { ...formProps };
    newProps.id = id;
    if (newProps.notes === "") {
      delete newProps.notes;
    }
    //console.log(newProps.date);
    if (newProps?.date?.getMonth) {
      newProps.date = newProps.date.getTime();
    }

    db.ref(userPath() + `/firings/${id}`).set({
      ...newProps,
    });

    dispatch({
      type: EDIT_FIRING_SUCCESS,
      payload: { ...newProps },
    });
    if (allowNavigate) {
      history.goBack();
    }
  };

export const deleteFiring =
  (id, allowNavigate = true) =>
  async (dispatch, getState) => {
    //  console.log("DeleteFiring");
    dispatch({ type: DELETE_FIRING_REQUEST });
    db.ref(userPath() + `/firings/${id}`).remove();

    //console.log("Removed from DB: " + id);
    dispatch({
      type: DELETE_FIRING_SUCCESS,
      payload: id,
    });
    if (allowNavigate) {
      console.log("Navigating back");
      history.push("/projects");
    }
    //history.goBack();
  };

// Segment Action Creators

export const createSegment =
  (formProps, allowNavigate = true) =>
  async (dispatch, getState) => {
    dispatch({ type: CREATE_SEGMENT_REQUEST });
    formProps.id = uuid();
    db.ref(userPath() + `/segments/${formProps.id}`).set({
      ...formProps,
    });

    dispatch({
      type: CREATE_SEGMENT_SUCCESS,
      payload: { ...formProps },
    });
    if (allowNavigate) {
      history.goBack();
    }
  };

export const fetchSegments = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_SEGMENTS_REQUEST });
  db.ref(userPath() + "/segments").once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_SEGMENTS_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const fetchSegment = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_SEGMENT_REQUEST });
  db.ref(userPath() + `/segments/${id}`).once("value", (snapshot) => {
    //console.log("FetchProjects");
    //console.log(snapshot.val());
    dispatch({
      type: FETCH_SEGMENT_SUCCESS,
      payload: snapshot.val(),
      id: id,
    });
  });
};
/*
export const fetchSegmentsByProject = (id) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_SEGMENT_BY_PROJECT,
    payload: id,
  });
};
*/
export const fetchSegmentsByFiring = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_SEGMENTS_BY_FIRING_REQUEST });

  db.ref(userPath() + "/segments")
    .orderByChild("firing_id")
    .equalTo(id)
    .once("value", (snapshot) => {
      //console.log("fetchFiringsByProject returned");
      //console.log(snapshot.val());
      dispatch({
        type: FETCH_SEGMENTS_BY_FIRING_SUCCESS,
        payload: snapshot.val(),
      });
    });
};

export const editSegment =
  (id, formProps, allowNavigate = true) =>
  async (dispatch, getState) => {
    dispatch({ type: EDIT_SEGMENT_REQUEST });
    formProps.id = id;
    db.ref(userPath() + `/segments/${id}`).set({
      ...formProps,
    });

    dispatch({
      type: EDIT_SEGMENT_SUCCESS,
      payload: { ...formProps },
    });
    if (allowNavigate) {
      history.goBack();
    }
  };

export const deleteSegment =
  (id, allowNavigate = true) =>
  async (dispatch, getState) => {
    dispatch({ type: DELETE_SEGMENT_REQUEST });
    db.ref(userPath() + `/segments/${id}`).remove();
    dispatch({
      type: DELETE_SEGMENT_SUCCESS,
      payload: id,
    });
    if (allowNavigate) {
      history.goBack();
    }

    //history.goBack();
  };

export const attemptLogin = (formProps) => async (dispatch) => {
  //const rFirebase = getFirebase();
  dispatch(alertActions.clear());
  console.log("attempting Login");
  console.log(Firebase);
  try {
    const response = await Firebase.auth().signInWithEmailAndPassword(
      formProps.email,
      formProps.password
    );
    //console.log("Response");
    //console.log(response);
    dispatch({ type: SIGN_IN_SUCCESS, payload: response });
    history.push("/projects");
  } catch (err) {
    dispatch({ type: SIGN_IN_FAILURE });
    //console.log("Err");
    //console.log(err);
    //console.log("Enderr");
    //console.log("Err.Response");
    //console.log(err.response);
    //console.log("Err.Response.Data");
    //console.log(err.response.data);
    if (err) {
      dispatch(alertActions.error(err.message));
    }
  }
};

export const signOut = () => async (dispatch) => {
  Firebase.auth()
    .signOut()
    .then(() => {
      //console.log("Signout Called (action Creator)");
      dispatch({
        type: SIGN_OUT_SUCCESS,
      });
    })
    .catch((e) => console.log("Error", e.message));
  //NavigationService.navigate("Login");
};

export const attemptSignup = (formProps) => async (dispatch) => {
  dispatch(alertActions.clear());
  //console.log("Attempting Signup");

  const response = Firebase.auth()
    .createUserWithEmailAndPassword(formProps.email, formProps.password)
    /* Not extending the schema for users at the moment. Or doing email verification, as we've no site to do it on
    .then((authUser) => {
      // Create a user in your Firebase realtime database
      return Firebase.auth().user(authUser.user.uid).set({
        username,
        email,
        roles,
      });
    }) 
    .then(() => {
      return Firebase.auth().doSendEmailVerification();
    })
    */
    .then(() => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
      //history.push("/signedup");
      history.push("/signedup");
    })

    .catch((err) => {
      dispatch({ type: SIGN_UP_FAILURE });
      console.log(err);
      if (err && err.response && err.response.data) {
        dispatch(stopSubmit("signupForm", err.response.data));
        const errorString = err.response.data.non_field_errors
          ? err.response.data.non_field_errors
          : err.response.data.detail;
        dispatch(alertActions.error(errorString));
      } else {
        dispatch(alertActions.error(UNKNOWN_ERROR));
      }
    });
};

export const editPreferences = (formProps) => async (dispatch, getState) => {
  dispatch({ type: EDIT_PREFERENCES_REQUEST });
  console.log(formProps);
  db.ref(userPath() + `/preferences`).set({
    ...formProps,
  });

  dispatch({
    type: EDIT_PREFERENCES_SUCCESS,
    payload: { ...formProps },
  });
};
export const fetchPreferences = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_PREFERENCES_REQUEST });
  db.ref(userPath() + "/preferences").once("value", (snapshot) => {
    console.log("FetchPreferences");
    console.log(snapshot.val());
    dispatch({
      type: FETCH_PREFERENCES_SUCCESS,
      payload: snapshot.val(),
    });
  });
};

export const editUserRecord = (uid, formProps) => async (dispatch) => {
  dispatch({ type: EDIT_USERDATA_REQUEST });
  let newProps = { ...formProps };
  newProps.uid = uid;
  db.ref(`/users/${uid}`).set({
    ...newProps,
  });

  dispatch({
    type: EDIT_USERDATA_SUCCESS,
    payload: { ...formProps },
  });
};

export const editFakeUID = (uid) => async (dispatch) => {
  dispatch({ type: EDIT_FAKEUID_SUCCESS, payload: { uid } });
};

const userPath = () => {
  const fakeUID = store.getState().fakeUID.uid;
  const uid = fakeUID ? fakeUID : store.getState().firebase.auth.uid;
  return "/userdata/" + uid;
};

const sharedUserPath = () => {
  const fakeUID = store.getState().fakeUID.uid;
  const uid = fakeUID ? fakeUID : store.getState().firebase.auth.uid;
  return "/shared_userdata/" + uid;
};

const sharedUID = () => {
  const fakeUID = store.getState().fakeUID.uid;
  return fakeUID ? fakeUID : store.getState().firebase.auth.uid;
};

export const getFileListing = async () => {
  const directory_listing = {};
  await cloudstore
    .ref("userdata")
    .listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) =>
        folderRef
          .listAll()
          .then((res) => {
            //console.log(res);
            const user = folderRef.location.path_.substring(9);
            directory_listing[user] = [];
            res.items.forEach((itemRef) => {
              directory_listing[user].push(itemRef?.location.path_);
            });
          })
          .catch((e) => console.log("Error: ", e?.message))
      );
    });
  //console.log(files);
  return directory_listing;
};

export const deleteFileFromURI = async (uri) => {
  //console.log(cloudstore);
  const reference = cloudstore.refFromURL(uri);
  console.log("Wanting to delete:");
  console.log(reference.fullPath);
  reference
    .delete()
    .then(() => {
      console.log("File Deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteFile = async (file) => {
  const fileRef = cloudstore.ref(file);
  console.log(fileRef);
  fileRef
    .delete()
    .then(() => {
      console.log("File Deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const attemptBartlettLogin = (formProps) => async (dispatch) => {
  dispatch(alertActions.clear());
  console.log("Attempting Bartlett Login");
  try {
    const response = await bartlogin.post("login.json", {
      user: { email: formProps.username, password: formProps.password },
    });
    dispatch({ type: BARTLETT_SIGN_IN_SUCCESS, payload: response.data });
  } catch (err) {
    if (err && err.response && err.response.data) {
      const errorString = err.response.data.non_field_errors
        ? err.response.data.non_field_errors
        : UNKNOWN_ERROR;
      console.log("BartlettLogin Error");
      dispatch(alertActions.error(errorString));
    } else {
      dispatch(alertActions.error(UNKNOWN_ERROR));
    }
  }
};

export const fetchBartlettKiln =
  (serial, username, password) => async (dispatch, getState) => {
    // For now... let's try to log in every time.
    await dispatch(
      attemptBartlettLogin({ username: username, password: password })
    );

    const token = getState().bartlett.session;
    console.log(`trying with token: ${token}`);
    try {
      const response = await bartkiln.post(
        `view?token=${token}&user_email=${username}`,
        { ids: [serial] },
        { headers: { "x-app-name-token": "kiln-aid" } }
      );
      dispatch({ type: FETCH_BARTLETT_STATUS_SUCCESS, payload: response.data });
    } catch (err) {
      if (err && err.response && err.response.data) {
        const errorString = err.response.data.non_field_errors
          ? err.response.data.non_field_errors
          : UNKNOWN_ERROR;
        console.log("BartlettFetchError");
        dispatch(alertActions.error(errorString));
      } else {
        dispatch(alertActions.error(UNKNOWN_ERROR));
      }
    }
  };

export const createSharedProject =
  (formProps) => async (dispatch, getState) => {
    //console.log(token);
    console.log(formProps);
    dispatch({ type: CREATE_SHARED_PROJECT_REQUEST });
    db.ref(sharedUserPath() + `/projects/${formProps.id}`).set({
      ...formProps,
    });
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
      payload: { sharing_user_uid: sharedUID(), project: formProps },
    });
  };

export const createSharedFiring = (formProps) => async (dispatch) => {
  console.log("createFiring");
  console.log(formProps);
  dispatch({ type: CREATE_SHARED_FIRING_REQUEST });
  let newProps = { ...formProps };

  db.ref(sharedUserPath() + `/firings/${formProps.id}`).set({
    ...newProps,
  });

  dispatch({
    type: CREATE_SHARED_FIRING_SUCCESS,
    payload: { sharing_user_uid: sharedUID(), firing: newProps },
  });
};

export const createSharedSegment = (formProps) => async (dispatch) => {
  dispatch({ type: CREATE_SHARED_SEGMENT_REQUEST });
  db.ref(sharedUserPath() + `/segments/${formProps.id}`).set({
    ...formProps,
  });

  dispatch({
    type: CREATE_SHARED_SEGMENT_SUCCESS,
    payload: { sharing_user_uid: sharedUID(), segment: formProps },
  });
};

export const fetchSharedSegmentsByFiring =
  (sharing_user_uid, firing_id) => async (dispatch, getState) => {
    dispatch({ type: FETCH_SHARED_SEGMENTS_BY_FIRING_REQUEST });

    db.ref(sharingUserPath(sharing_user_uid) + "/segments")
      .orderByChild("firing_id")
      .equalTo(firing_id)
      .once("value", (snapshot) => {
        //console.log("fetchFiringsByProject returned");
        //console.log(snapshot.val());
        dispatch({
          type: FETCH_SHARED_SEGMENTS_BY_FIRING_SUCCESS,
          payload: {
            sharing_user_uid: sharing_user_uid,
            firing_id: firing_id,
            segments: snapshot.val(),
          },
        });
      });
  };
export const fetchSharedFiring =
  (sharing_user_uid, firing_id) => async (dispatch, getState) => {
    dispatch({ type: FETCH_SHARED_FIRING_REQUEST });
    db.ref(sharingUserPath(sharing_user_uid) + `/firings/${firing_id}`).once(
      "value",
      (snapshot) => {
        //console.log("FetchProjects");
        //console.log(snapshot.val());
        dispatch({
          type: FETCH_SHARED_FIRING_SUCCESS,
          payload: {
            sharing_user_uid: sharing_user_uid,
            firing: snapshot.val(),
          },
        });
      }
    );
  };

export const fetchSharedProjects =
  (sharing_user_uid) => async (dispatch, getState) => {
    dispatch({ type: FETCH_SHARED_PROJECTS_REQUEST });
    //console.log("Reading from: " + userPath() + "/projects");
    db.ref(sharingUserPath(sharing_user_uid) + "/projects").once(
      "value",
      (snapshot) => {
        //console.log("FetchProjects");
        //console.log(snapshot.val());
        dispatch({
          type: FETCH_SHARED_PROJECTS_SUCCESS,
          payload: {
            sharing_user_uid: sharing_user_uid,
            projects: snapshot.val(),
          },
        });
      }
    );
  };

export const sharingUserPath = (sharing_user_uid) => {
  return "/shared_userdata/" + sharing_user_uid;
};

export const createInventoryItem =
  (formProps, allowNavigate = false) =>
  async (dispatch) => {
    dispatch({ type: CREATE_INVENTORY_ITEM_REQUEST });
    //console.log(token);
    formProps.id = uuid();

    db.ref(userPath() + `/inventory/${formProps.id}`).set({
      ...formProps,
    });
    dispatch({
      type: CREATE_INVENTORY_ITEM_SUCCESS,
      payload: { ...formProps },
    });
    if (allowNavigate) {
      history.goBack();
    }
  };

export const editInventoryItem =
  (id, formProps, allowNavigate = false) =>
  async (dispatch) => {
    dispatch({ type: EDIT_INVENTORY_ITEM_REQUEST });
    //console.log(token);
    formProps.id = id;

    db.ref(userPath() + `/inventory/${formProps.id}`).set({
      ...formProps,
    });
    dispatch({
      type: EDIT_INVENTORY_ITEM_SUCCESS,
      payload: { ...formProps },
    });
    if (allowNavigate) {
      history.goBack();
    }
  };
export const deleteInventoryItem =
  (id, allowNavigate = false) =>
  async (dispatch) => {
    dispatch({ type: DELETE_INVENTORY_ITEM_REQUEST });
    //console.log(token);

    db.ref(userPath() + `/inventory/${id}`).remove();
    dispatch({
      type: DELETE_INVENTORY_ITEM_SUCCESS,
      payload: id,
    });
    if (allowNavigate) {
      history.goBack();
    }
  };
