import React from "react";

import { Image, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  return (
    <Card as={Link} to={`/projects/${props.id}`}>
      <Card.Header>{props.name}</Card.Header>
      <Card.Content extra>
        {props.photo && <Image src={props.photo} />}
      </Card.Content>
    </Card>
  );
};

export default ProjectCard;
