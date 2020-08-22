import React from "react";

import useFirebaseKilns from "../hooks/useFirebaseKilns";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

import KilnCard from "./KilnCard";

const KilnsListPage = ({ navigation }) => {
  const kilns = useFirebaseKilns();

  return (
    <div>
      <Card.Group>
        {kilns &&
          Object.values(kilns).map(
            (kiln) => kiln && <KilnCard {...kiln} key={kiln.id} />
          )}

        <Card as={Link} to={`/new_kiln/`}>
          <Card.Header>Add New Kiln</Card.Header>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default KilnsListPage;
