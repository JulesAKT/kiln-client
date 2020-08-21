import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const auth = useSelector((state) => state.firebase.auth);
  console.log(isLoaded(auth));
  console.log(isEmpty(auth));
  return (
    <Route
      {...rest}
      render={(props) =>
        !!currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
