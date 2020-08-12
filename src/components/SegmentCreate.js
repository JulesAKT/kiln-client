import React from "react";
import { useDispatch } from "react-redux";
import { createSegment } from "../actions";
import { Container, Header } from "semantic-ui-react";
import SegmentForm from "../components/SegmentForm";

const SegmentCreate = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (formValues) => {
    dispatch(createSegment(formValues));
  };

  return (
    <>
      <Header as="h2" attached="top">
        Create Segment
      </Header>
      <Container attached>
        <SegmentForm
          onSubmit={handleSubmit}
          initialValues={{ firing_id: props.match.params.id }}
        />
      </Container>
    </>
  );
};

export default SegmentCreate;
