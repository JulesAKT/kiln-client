import React from "react";
import { Icon, List, Image, Card, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import useFirebaseGlassData from "../hooks/useFirebaseGlassData";

import {
  getGlassReactionTypeCharacters,
  getGlassReactionTypeColour,
  getGlassReactionTypeColourName,
  getHexColor,
} from "../helpers/glassHelpers";
import { glassImage } from "../helpers/logoHelpers";
const MaterialCard = (props) => {
  const glass_type = props.glass || props.project.glass;
  const glass_data = useFirebaseGlassData(glass_type);
  const inventory = glass_data?.inventory;

  const glass_ref = props.glass_reference;
  //console.log(glass_data);
  if (!inventory) {
    return <div>Loading...</div>;
  }
  console.log(glass_ref);
  let color;
  let description;
  let type;
  if (inventory[glass_ref]) {
    ({ color, description, type } = inventory[glass_ref]);
  } else {
    color = { rgb: { r: 0, g: 0, b: 0 } };
    description = "Unknown Glass Item";
    type = "Unknown";
  }
  const getGlassItem = () => {
    const colour = getGlassReactionTypeColour(glass_ref, glass_data);
    const colour_name = getGlassReactionTypeColourName(glass_ref, glass_data);
    const characters = getGlassReactionTypeCharacters(glass_ref, glass_data);
    console.log(`Color:`);
    console.log(color);
    //    console.log(`Characters: ${characters}`);
    return (
      <>
        <span
          style={{
            color: color.multicolored ? "black" : getHexColor(color.rgb),
            fontSize: color.multicolored ? 18 : 32,
          }}
        >
          {color.multicolored ? (
            <span>Multicoloured</span>
          ) : (
            <Icon name="square full" />
          )}

          {characters && (
            <Label circular floating color={colour_name} size="large">
              {characters}
            </Label>
          )}
        </span>
      </>
    );
  };

  const glass_item = getGlassItem();
  const colour = getGlassReactionTypeColour(glass_ref, glass_data);
  const characters = getGlassReactionTypeCharacters(glass_ref, glass_data);
  console.log(`MaterialCard: Reacting = ${props.reacting}`);
  return (
    <Card color={props.reacting ? "red" : undefined}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          avatar
          src={glassImage(glass_type)}
        />

        <Card.Header>
          {props.glass_reference
            ? props.glass_reference + " " + description
            : props.description}
        </Card.Header>
        <Card.Meta>{props.glass_reference && type}</Card.Meta>
        <Card.Description>
          {props.glass_reference ? glass_item : props.description}
          {props.reacting && (
            <div>WILL REACT WITH OTHER MATERIALS IN THIS PROJECT</div>
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/edit_material/${props.project.id}/${props.id}`}>
            <Button primary>
              <Icon name="edit" />
              Edit
            </Button>
          </Link>
          <Link to={`/delete_material/${props.project.id}/${props.id}`}>
            <Button negative>
              <Icon name="trash" />
              Delete
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default MaterialCard;
