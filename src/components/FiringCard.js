import React from "react";
import { Icon, List } from "semantic-ui-react";

const FiringCard = (props) => {
  //console.log("FiringCard");
  //console.log(props);
  return (
    <List.Item>
      <List.Content>
        {!props.hideIndex && <>{props.index + 1}.</>}
        {props.name}
        {props.favourite && (
          <Icon name="star" size="small" style={{ marginLeft: "16px" }} />
        )}
      </List.Content>
    </List.Item>
  );
};

export default FiringCard;
