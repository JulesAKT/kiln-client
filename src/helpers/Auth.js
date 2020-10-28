import React, { useEffect, useState } from "react";
import Firebase from "../api/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    //console.log(Firebase);
    if (typeof jest === "undefined") {
      Firebase.auth().onAuthStateChanged((user) => {
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
