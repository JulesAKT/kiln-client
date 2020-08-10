import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { View, Text, ScrollView, FlatList } from "react-native";
import { List } from "semantic-ui-react";
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
      <List>
        {kiln_array.map((kiln) => (
          <List.Item>
            <KilnCard {...kiln} />
          </List.Item>
        ))}

        <List.Item>
          <Link to="/new_kiln">
            <KilnCard name="Add New Kiln" />
          </Link>
        </List.Item>
      </List>{" "}
    </div>
  );
};

export default KilnsList;
