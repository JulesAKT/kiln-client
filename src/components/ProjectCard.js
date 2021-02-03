import React from "react";

import { Image, Card, Rating, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { findSuitablePhoto } from "../helpers/photoHelpers";
import { glassImage } from "../helpers/logoHelpers";

const ProjectCard = (props) => {
  return (
    <Card as={Link} to={`/projects/${props.id}`} style={{ width: "256px" }}>
      <Card.Header as="h3">{props.name}</Card.Header>
      <Card.Meta>Fired in Kiln: {props.kilnName}</Card.Meta>
      <Card.Content extra>
        <span>
          <Icon name="move" />
        </span>
        <span>{`${props.width}x${props.depth}x${props.thickness}(mm)`}</span>
      </Card.Content>

      <Card.Description>
        <div>
          <Image
            avatar
            src={glassImage(props.glass)}
            style={{ float: "left", marginLeft: "8px", marginBottom: "20px" }}
          />
          <Rating
            maxRating={5}
            rating={props.stars}
            disabled={true}
            style={{ float: "right", marginTop: "8px" }}
          />
        </div>
        <div style={{ height: "100%" }}>
          <Image src={findSuitablePhoto(props, "small").uri} />
        </div>
      </Card.Description>
    </Card>
  );
};

export default ProjectCard;
