import React, { useContext } from "react";
//import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
//import { signOut } from "../actions";
import { isLoaded } from "react-redux-firebase";
import { isEmpty } from "lodash";
import UserMenu from "./UserMenu";
import useFakeUID from "../hooks/useFakeUID";

import { AuthContext } from "../helpers/Auth";

const LoginButton = () => {
  //const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const fakeUID = useFakeUID();
  const triggerComponent = fakeUID ? (
    <Icon name="user secret" />
  ) : currentUser && currentUser.photoURL ? (
    <Image src={currentUser.photoURL} avatar />
  ) : (
    <Icon name="user" />
  );

  if (isLoaded(currentUser) && !isEmpty(currentUser) && currentUser.uid) {
    return <UserMenu trigger={triggerComponent} />;
  } else {
    return (
      <Link to="/login">
        <button className="ui button primary">Login</button>
      </Link>
    );
  }
};

export default LoginButton;
