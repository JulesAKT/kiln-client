import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Divider } from "semantic-ui-react";
import { signOut } from "../actions";
import history from "../history";
import { AuthContext, superUserUID } from "../helpers/Auth";

const UserMenu = ({ trigger }) => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  return (
    <Dropdown trigger={trigger}>
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
        {currentUser && currentUser.uid === superUserUID && (
          <>
            <Divider style={{ height: 10 }} />
            <Dropdown.Item
              icon="cog"
              text="SuperUser Functions"
              onClick={() => history.push("/superuser")}
            ></Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
