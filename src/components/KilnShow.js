import React, { useEffect } from "react";
//import { Text, ScrollView, Alert, StyleSheet, View } from "react-native";
//import { Card, ListItem, Button } from "react-native-elements";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchKiln } from "../actions";
import { useDispatch, useSelector } from "react-redux";

import { kilnLogo } from "../helpers/logoHelpers";

const KilnShowScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const navigation = props.navigation;

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
        <Image src={kilnLogo(kiln.manufacturer)} avatar />
        <span>{kiln.manufacturer}</span>
      </Card>
      <Card>
        <Button onPress={() => navigation.navigate("KilnEdit", { id: id })}>
          Edit
        </Button>
        <Link to={`/kiln/delete/${id}`}>
          <Button>Delete</Button>
        </Link>
      </Card>
    </div>
  );
};

export default KilnShowScreen;
