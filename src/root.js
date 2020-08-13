import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "./api/firebase";

export default ({ children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
