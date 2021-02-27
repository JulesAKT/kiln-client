import React from "react";
import { Header, Button, List } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import useFirebasePreferences from "../hooks/useFirebasePreferences";
import { editPreferences } from "../actions";
import { degreeName, lengthName } from "../helpers/unitHelpers";
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

  const toggleLength = () => {
    //console.log("Toggling");
    //console.log(preferences);
    //console.log(`Old setting: ${preferences.length_unit}`);
    const newLength =
      preferences && preferences.length_unit === "in" ? "mm" : "in";
    //console.log(`New setting: ${newLength}`);
    dispatch(editPreferences({ ...preferences, length_unit: newLength }));
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
        <List.Item>
          Lengths are in:{" "}
          <Button
            onClick={() => {
              toggleLength();
            }}
          >
            {preferences && lengthName(preferences.length_unit)}
          </Button>
        </List.Item>
      </List>
    </div>
  );
};

export default PreferencePage;
