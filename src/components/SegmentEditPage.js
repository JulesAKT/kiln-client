import React from "react";
//import { Text, ScrollView, Button, Alert } from "react-native";
import { Container, Button, Header } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import SegmentForm from "./SegmentForm";
import { fetchSegment, editSegment, deleteSegment } from "../actions";
import { useFirebaseConnect } from "react-redux-firebase";

const SegmentEditPage = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const id = props.route.params.id;

  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect([{ path: `/userdata/${uid}/segments` }]);

  const popupDeleteAlert = () => {
    Alert.alert(
      "Confirm",
      "Delete Segment?",
      [
        {
          text: "Cancel",
        },
        { text: "OK", onPress: () => dispatch(deleteSegment(id)) },
      ],
      { cancelable: false }
    );
  };

  const handleSubmit = (formValues) => {
    dispatch(editSegment(id, formValues));
  };

  const segment = useSelector(
    ({ firebase: { data } }) =>
      data.userdata &&
      data.userdata[uid] &&
      data.userdata[uid].segments &&
      data.userdata[uid].segments[id]
  );

  if (!segment) {
    return <Text>Loading...</Text>;
  }
  //console.log(id);
  return (
    <>
      <Header as="h2" attached="top">
        Edit Segment
      </Header>
      <Container attached>
        <SegmentForm onSubmit={handleSubmit} initialValues={segment} />
        <Button title="Delete Segment" onPress={popupDeleteAlert} />
      </Container>
    </>
  );
};

export default SegmentEditPage;
