import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";

import { editProject } from "../actions";
import Modal from "../Modal";
import history from "../history";
import useFirebaseProject from "../hooks/useFirebaseProject";

const MaterialDeletePage = (props) => {
  const dispatch = useDispatch();
  const project_id = props.match.params.project_id;
  const material_id = props.match.params.material_id;
  const project = useFirebaseProject(project_id);

  const handleDelete = () => {
    const new_project = { ...project };
    delete new_project.materials[material_id];
    console.log(new_project);
    dispatch(editProject(project_id, new_project));
  };

  const actions = () => (
    <React.Fragment>
      <Button
        negative
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!project) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        {project?.materials &&
        project?.materials[material_id]?.glass_reference ? (
          <div>Glass:{project?.materials[material_id]?.glass_reference}</div>
        ) : (
          <div>
            Description:
            {project?.materials && project?.materials[material_id]?.description}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Delete Material"
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.goBack()}
    />
  );
};

export default MaterialDeletePage;
