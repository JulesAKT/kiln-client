import React, { useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchKiln } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import { kilnLogo } from "../helpers/logoHelpers";

const KilnShowScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(fetchKiln(id));
  }, [dispatch, id]);
  //console.log(`Finding: ${id}`);
  const kiln = useSelector((state) => state.kilns[id]);
  //console.log(kiln);
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
        <Link to={`/kiln/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </Card>
    </div>
  );
};

export default KilnShowScreen;
