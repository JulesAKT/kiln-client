import React from "react";
import { Link } from "react-router-dom";

import { Card, Image } from "semantic-ui-react";

import { kilnLogo } from "../helpers/logoHelpers";

const KilnCard = (props) => {
  return (
    <Card as={Link} to={`/kilns/${props.id}`}>
      <Card.Header>{props.name}</Card.Header>
      <Card.Content extra>
        <Image avatar src={kilnLogo(props.manufacturer)} />
      </Card.Content>
    </Card>
  );
};

export default KilnCard;
