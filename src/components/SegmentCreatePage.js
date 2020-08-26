import React from "react";
import { useDispatch } from "react-redux";
import { createSegment } from "../actions";
import { Segment, Header } from "semantic-ui-react";
import SegmentForm from "./SegmentForm";

const SegmentCreatePage = (props) => {
  const dispatch = useDispatch();

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
          }}
        />
      </Segment>
    </>
  );
};

export default SegmentCreatePage;
