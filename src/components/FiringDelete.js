import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import _ from "lodash";

import { deleteFiring } from "../actions";
import Modal from "../Modal";
import history from "../history";
import useFirebaseSegments from "../hooks/useFirebaseSegments";
import useFirebaseFiring from "../hooks/useFirebaseFiring";

const FiringDelete = (props) => {
  const firing = useFirebaseFiring(props.match.params.id);
  const segments = useFirebaseSegments();
  const dispatch = useDispatch();

  const my_segments = _.filter(
    segments,
    (segment) => segment.firing_id === props.match.params.id
  );

  const actions = () => (
    <React.Fragment>
      {console.log(my_segments.length !== 0)}
      <Button
        negative
        disabled={my_segments.length !== 0}
        onClick={() => {
          if (my_segments.length === 0) {
            dispatch(deleteFiring(props.match.params.id));
          }
        }}
      >
        Delete
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!firing || !segments) {
      return <div>Loading...</div>;
    }
    if (my_segments.length !== 0) {
      return (
        <div>
          This firing still has some segments. You can't delete the firing
          without first deleting every segment.
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>Name:{firing.name}</div>
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Delete Firing"
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.goBack()}
    />
  );
};

export default FiringDelete;
