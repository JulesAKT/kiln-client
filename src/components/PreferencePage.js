import React from "react";
import { Header, Button, List } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import useFirebasePreferences from "../hooks/useFirebasePreferences";
import { editPreferences } from "../actions";
import { degreeName } from "../helpers/temperatureHelpers";
const PreferencePage = () => {
  const dispatch = useDispatch();
  const preferences = useFirebasePreferences();

  const toggleDegrees = () => {
    //console.log(`Old setting: ${preferences.degrees}`);
    const newDegrees =
      preferences && preferences.degrees === "fahrenheit"
        ? "celsius"
        : "fahrenheit";
    //console.log(`New setting: ${newDegrees}`);
    dispatch(editPreferences({ ...preferences, degrees: newDegrees }));
  };

  return (
    <div>
      <Header as="h1">User Profile</Header>
      <List>
        <List.Item>
          Temperatures are in:{" "}
          <Button
            onClick={() => {
              toggleDegrees();
            }}
          >
            {preferences && degreeName(preferences.degrees)}
          </Button>
        </List.Item>
      </List>
    </div>
  );
};

export default PreferencePage;
