import React from "react";
//import { Link } from "react-router-dom";
//import { ListItem, Image, Text } from "react-native-elements";
import { List, Image } from "semantic-ui-react";

import { kilnLogo } from "../helpers/logoHelpers";

const KilnCard = (props) => {
  return (
    <List.Item key={props.id}>
      <Image avatar src={kilnLogo(props.manufacturer)} />

      <span>{props.name}</span>
    </List.Item>
  );
};

export default KilnCard;
