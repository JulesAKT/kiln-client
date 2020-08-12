import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { View, Text, ScrollView, FlatList } from "react-native";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchKilns } from "../actions";

import KilnCard from "../components/KilnCard";
//import { TouchableOpacity } from "react-native-gesture-handler";

const KilnsList = ({ navigation }) => {
  const kilns = useSelector((state) => state.kilns);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchKilns());
  }, [dispatch]);

  if (!kilns) {
    return <div>Loading...</div>;
  }
  //console.log(kilns);
  const kiln_array = Object.values(kilns);
  return (
    <div>
      <Card.Group>
        {kiln_array.map((kiln) => (
          <KilnCard {...kiln} key={kiln.id} />
        ))}

        <Card as={Link} to={`/new_kiln/`}>
          <Card.Header>Add New Kiln</Card.Header>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default KilnsList;
