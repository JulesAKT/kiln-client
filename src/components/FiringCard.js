import React from "react";
import { Icon, List } from "semantic-ui-react";

const FiringCard = (props) => {
  return (
    <List.Item>
      {!props.hideIndex && (
        <List.Content floated>{props.index + 1}</List.Content>
      )}
      <List.Content>{props.name}</List.Content>
      {props.favourite && (
        <List.Content floated="right">
          <Icon name="star-border" />
        </List.Content>
      )}
    </List.Item>
  );
};

export default FiringCard;
