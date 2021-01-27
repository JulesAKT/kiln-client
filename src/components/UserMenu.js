import React from "react";

import { Dropdown, Icon } from "semantic-ui-react";

import { signOut } from "../actions";
import { useDispatch } from "react-redux";
import history from "../history";
const UserMenu = ({ trigger }) => {
  const dispatch = useDispatch();
  return (
    <Dropdown trigger={<Icon name="user" />}>
      <Dropdown.Menu>
        <Dropdown.Header>Commands</Dropdown.Header>
        <Dropdown.Item
          icon="sign-out"
          text="Logout"
          onClick={() => {
            dispatch(signOut());
          }}
        ></Dropdown.Item>
        {/*
        <Dropdown.Item icon="sign-out" text="Change Password" />
        */}
        <Dropdown.Item
          icon="sign-out"
          text="My Favourite Firings"
          onClick={() => history.push("/favourite_firings")}
        />
        <Dropdown.Item
          icon="cog"
          text="User Preferences"
          onClick={() => history.push("/preferences")}
        ></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
