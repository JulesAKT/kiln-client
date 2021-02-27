import React from "react";

import { Image, Card, Rating, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { findSuitablePhoto } from "../helpers/photoHelpers";
import { glassImage } from "../helpers/logoHelpers";
import { convertLengthUnit } from "../helpers/unitHelpers";
import useFirebasePreferences from "../hooks/useFirebasePreferences";

const ProjectCard = (props) => {
  const preferences = useFirebasePreferences();
  const length_unit = props.length_unit || "mm";
  const desired_unit = (preferences && preferences.length_unit) || "mm";
  const width = convertLengthUnit(length_unit, desired_unit, props.width);
  const depth = convertLengthUnit(length_unit, desired_unit, props.depth);
  const thickness = convertLengthUnit(
    length_unit,
    desired_unit,
    props.thickness
  );
  return (
    <Card as={Link} to={`/projects/${props.id}`} style={{ width: "256px" }}>
      <Card.Header as="h3">{props.name}</Card.Header>
      <Card.Meta>Fired in Kiln: {props.kilnName}</Card.Meta>
      <Card.Content extra>
        <span>
          <Icon name="move" />
        </span>
        <span>{`${width}x${depth}x${thickness}(${desired_unit})`}</span>
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
