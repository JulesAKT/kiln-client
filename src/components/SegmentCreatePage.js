import React from "react";
import { useDispatch } from "react-redux";

import { Segment, Header } from "semantic-ui-react";
import { createSegment } from "../actions";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import SegmentForm from "./SegmentForm";

const SegmentCreatePage = (props) => {
  const dispatch = useDispatch();
  const preferences = useFirebasePreferences();
  //console.log(preferences);
  const degrees =
    preferences && preferences.degrees
      ? preferences && preferences.degrees
      : "celsius";
  //  console.log(degrees);

  const handleSubmit = (formValues) => {
    dispatch(createSegment(formValues));
  };

  return (
    <>
      <Header as="h2" attached="top">
        Create Segment
      </Header>
      <Segment attached>
        <SegmentForm
          onSubmit={handleSubmit}
          initialValues={{
            firing_id: props.match.params.id,
            order: props.match.params.order,
            degrees: degrees,
          }}
        />
      </Segment>
    </>
  );
};

export default SegmentCreatePage;
