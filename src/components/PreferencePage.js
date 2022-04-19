import React, { useEffect, useState } from "react";
import { Header, Button, List, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import etsy from "../api/etsy";

import useFirebasePreferences from "../hooks/useFirebasePreferences";
import { editPreferences } from "../actions";
import { degreeName, lengthName } from "../helpers/unitHelpers";

const EtsyStatus = (props) => {
  const [application_id, setApplicationId] = useState(undefined);
  console.log("Fetching Etsy Status");
  const fetchEtsyStatus = async () => {
    try {
      const response = await etsy.get("openapi-ping");
      console.log("Ping results:", response);
      setApplicationId(response?.data?.application_id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEtsyStatus();
  }, []);
  return <div>Etsy Ping - Application ID: {application_id}</div>;
};

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
      <Header as="h1">Etsy</Header>
      <Button>
        <Icon name="etsy" />
        Login
      </Button>
      <EtsyStatus />
    </div>
  );
};

export default PreferencePage;
