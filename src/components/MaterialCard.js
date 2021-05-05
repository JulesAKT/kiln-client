import React from "react";
import { Icon, List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import useFirebaseGlassData from "../hooks/useFirebaseGlassData";

import { getHexColor } from "../helpers/glassHelpers";
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
  const glass_item = (
    <>
      <span>
        <Image avatar src={glassImage(glass_type)} />
      </span>
      <span style={{ color: getHexColor(color.rgb) }}>
        <Icon name="square full" />
      </span>
      <span>{`${glass_ref} - ${description}:${type}`}</span>
    </>
  );
  return (
    <List.Item>
      <List.Content>
        <Link to={`/edit_material/${props.project.id}/${props.id}`}>
          <Icon name="edit" />
        </Link>
        <Link to={`/delete_material/${props.project.id}/${props.id}`}>
          <Icon name="trash" />
        </Link>
        {props.glass_reference ? glass_item : props.description}
      </List.Content>
    </List.Item>
  );
};

export default MaterialCard;
