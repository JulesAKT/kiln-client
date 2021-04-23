import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";

import { deleteSegment } from "../actions";
import Modal from "../Modal";
import history from "../history";
import useFirebaseSegment from "../hooks/useFirebaseSegment";

const SegmentDeletePage = (props) => {
  console.log(`Looking for: ${props.match.params.id}`);
  const segment = useFirebaseSegment(props.match.params.id);

  const dispatch = useDispatch();

  const actions = () => (
    <React.Fragment>
      <Button
        negative
        onClick={() => {
          dispatch(deleteSegment(props.match.params.id));
        }}
      >
        Delete
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!segment) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <div>Name:{segment.name}</div>
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Delete Segment"
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.goBack()}
    />
  );
};

export default SegmentDeletePage;
