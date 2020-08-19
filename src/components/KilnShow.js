import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useFirebaseKiln from "../hooks/useFirebaseKiln";

import { kilnLogo } from "../helpers/logoHelpers";

const KilnShowScreen = (props) => {
  console.log(props);
  const id = props.match.params.id;
  const kiln = useFirebaseKiln(id);
  if (!kiln) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <Card.Header>{kiln.name}</Card.Header>
        <Card.Content>
          <Image src={kilnLogo(kiln.manufacturer)} avatar />
          <span>{kiln.manufacturer}</span>
        </Card.Content>
      </Card>
      <Card>
        <Link to={`/kilns/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Link to={`/kilns/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </Card>
    </div>
  );
};

export default KilnShowScreen;
