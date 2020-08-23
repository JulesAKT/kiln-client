import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import _ from "lodash";

import { deleteProject } from "../actions";
import Modal from "../Modal";
import history from "../history";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import useFirebaseProject from "../hooks/useFirebaseProject";

const ProjectDeletePage = (props) => {
  const project = useFirebaseProject(props.match.params.id);
  const firings = useFirebaseFirings();
  const dispatch = useDispatch();

  const my_firings = _.filter(
    firings,
    (firing) => firing.firing_id === props.match.params.id
  );

  const actions = () => (
    <React.Fragment>
      {console.log(my_firings.length !== 0)}
      <Button
        negative
        disabled={my_firings.length !== 0}
        onClick={() => {
          if (my_firings.length === 0) {
            dispatch(deleteProject(props.match.params.id));
          }
        }}
      >
        Delete
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!project || !firings) {
      return <div>Loading...</div>;
    }
    if (my_firings.length !== 0) {
      return (
        <div>
          This project still has some firings. You can't delete the project
          without first deleting every firing.
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>Name:{project.name}</div>
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Delete Project"
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.goBack()}
    />
  );
};

export default ProjectDeletePage;
