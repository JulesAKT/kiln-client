import React from "react";

import { Segment, Header } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import SegmentForm from "./SegmentForm";
import { editSegment } from "../actions";
import useFirebaseSegment from "../hooks/useFirebaseSegment";

const SegmentEditPage = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const segment = useFirebaseSegment(id);

  /*   const popupDeleteAlert = () => {
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
*/
  const handleSubmit = (formValues) => {
    dispatch(editSegment(id, formValues));
  };

  if (!segment) {
    return <div>Loading...</div>;
  }
  //console.log(id);
  return (
    <>
      <Header as="h2" attached="top">
        Edit Segment
      </Header>
      <Segment attached>
        <SegmentForm onSubmit={handleSubmit} initialValues={segment} />
      </Segment>
    </>
  );
};

export default SegmentEditPage;
