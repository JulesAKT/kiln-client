import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useFirebaseKiln from "../hooks/useFirebaseKiln";

import { kilnLogo, controllerLogo } from "../helpers/logoHelpers";

const KilnShowPage = (props) => {
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
          <Image src={kilnLogo(kiln.manufacturer)} size="massive" />
        </Card.Content>
        <Card.Content extra>
          {kiln.controller === "bartlett_genesis" && (
            <Image size="medium" src={controllerLogo(kiln.controller)} />
          )}
        </Card.Content>
      </Card>

      <div>
        <Link to={`/kilns/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Link to={`/kilns/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </div>
    </div>
  );
};

export default KilnShowPage;
