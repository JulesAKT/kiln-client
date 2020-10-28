import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "./api/firebase";
//console.log("rrfProps");
//console.log(rrfProps);
//console.log(rrfProps.firebase.apps());
export default ({ children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
