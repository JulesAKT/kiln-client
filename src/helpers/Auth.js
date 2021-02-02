import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUserRecord } from "../actions";
import Firebase from "../api/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  const updateUserRecord = (user) => {
    if (user) {
      dispatch(
        editUserRecord(user.uid, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      //      console.log("Updating User Record");
      //      console.log(`User: ${user.displayName}`);
      //      console.log(`Email: ${user.email}`);
      //      console.log(`PhotoURL: ${user.photoURL}`);
    }
  };

  useEffect(() => {
    //console.log(Firebase);
    if (typeof jest === "undefined") {
      Firebase.auth().onAuthStateChanged((user) => {
        updateUserRecord(user);
        setCurrentUser(user);
        setPending(false);
      });
    } else {
      setCurrentUser({ uid: "test" });
      setPending(false);
    }
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const superUserUID = "68jLhdzhOAPhZVGnTsJBynJQEuG3";

export const getDisplayName = (user) => {
  console.log(user);
  return user.name ? user.name : user.email ? user.email : user.uid;
};
