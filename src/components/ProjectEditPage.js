import React from "react";

import { useDispatch } from "react-redux";
import useFirebaseKilns from "../hooks/useFirebaseKilns";
import useFirebaseProject from "../hooks/useFirebaseProject";
import ProjectForm from "./ProjectForm";
import { editProject } from "../actions";

const ProjectEditPage = (props) => {
  const dispatch = useDispatch();
  const kilns = useFirebaseKilns();
  const id = props.match.params.id;

  const project = useFirebaseProject(id);

  //const kiln_array = Object.values(kilns);
  if (!kilns) {
    return <div>Please create a kiln first</div>;
  }

  const handleSubmit = (formValues) => {
    dispatch(editProject(id, formValues));
  };

  return (
    <div>
      <ProjectForm onSubmit={handleSubmit} initialValues={project} />
    </div>
  );
};

export default ProjectEditPage;
