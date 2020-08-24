import React from "react";

import { Image, Card, Rating, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { glassImage } from "../helpers/logoHelpers";

const ProjectCard = (props) => {
  return (
    <Card as={Link} to={`/projects/${props.id}`}>
      <Card.Header as="h3">{props.name}</Card.Header>
      <Card.Meta>
        Fired in Kiln: {props.kilnName}
        <div>
          <Image
            avatar
            src={glassImage(props.glass)}
            style={{ float: "left" }}
          />
          <Rating
            maxRating={5}
            rating={props.stars}
            disabled={true}
            style={{ float: "right", marginTop: "8px" }}
          />
        </div>
        <div>{props.photo && <Image src={props.photo} />}</div>
      </Card.Meta>

      <div className="bottom aligned">
        <span>
          <Icon name="move" />
        </span>
        <span>{`${props.width}x${props.depth}x${props.thickness}(mm)`}</span>
      </div>
    </Card>
  );
};

export default ProjectCard;
