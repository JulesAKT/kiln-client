import React from "react";

import { Image, Card, Rating, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { glassImage } from "../helpers/logoHelpers";

const ProjectCard = (props) => {
  const findSuitablePhoto = (props) => {
    if (Array.isArray(props.photos)) {
      console.log("Handling New-style Photos");
      return props.photos[0].photo && <Image src={props.photos[0].photo} />;
    } else {
      return props.photo && <Image src={props.photo} />;
    }
  };

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
        <div>{findSuitablePhoto(props)}</div>
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
