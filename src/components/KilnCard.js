import React from "react";
import { Link } from "react-router-dom";

import { Card, Image } from "semantic-ui-react";

import { kilnLogo, controllerLogo } from "../helpers/logoHelpers";

const KilnCard = (props) => {
  return (
    <Card as={Link} to={`/kilns/${props.id}`}>
      <Card.Header>{props.name}</Card.Header>
      <Card.Content>
        <Image size="massive" src={kilnLogo(props.manufacturer)} />
      </Card.Content>
      <Card.Content extra>
        {props.controller === "bartlett_genesis" && (
          <Image size="medium" src={controllerLogo(props.controller)} />
        )}
      </Card.Content>
    </Card>
  );
};

export default KilnCard;
