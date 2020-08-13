import React, { useEffect } from "react";
import { useSelector } from "react-redux";
//import { View, Text, ScrollView, FlatList } from "react-native";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
//import { fetchKilns } from "../actions";
import { useFirebaseConnect } from "react-redux-firebase";

import KilnCard from "../components/KilnCard";
//import { TouchableOpacity } from "react-native-gesture-handler";

const KilnsList = ({ navigation }) => {
  const uid = useSelector((state) => state.auth.uid);
  useFirebaseConnect([{ path: `/userdata/${uid}/kilns` }]);

  const kilns = useSelector(
    (state) =>
      state.firebase.data.userdata && state.firebase.data.userdata[uid].kilns
  );

  /*const kilns = useSelector((state) => state.kilns);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchKilns());
  }, [dispatch]);
*/
  if (!kilns) {
    return <div>Loading...</div>;
  }
  //console.log(kilns);
  const kiln_array = Object.values(kilns);
  console.log(kilns);
  return (
    <div>
      <Card.Group>
        {kiln_array.map((kiln) => kiln && <KilnCard {...kiln} key={kiln.id} />)}

        <Card as={Link} to={`/new_kiln/`}>
          <Card.Header>Add New Kiln</Card.Header>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default KilnsList;
