import React from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../actions";
import useFirebaseProject from "../hooks/useFirebaseProject";
import uuid from "react-uuid";

import MaterialForm from "./MaterialForm";

const MaterialAddPage = (props) => {
  const dispatch = useDispatch();
  const project_id = props.match.params.id;
  const order = props.match.params.order;
  const project = useFirebaseProject(project_id);

  const handleSubmit = (formValues) => {
    const new_project = { ...project };
    const new_material = { order: order, ...formValues, glass: project?.glass };
    const new_material_uuid = uuid();

    new_project.materials = {
      ...new_project.materials,
      [new_material_uuid]: new_material,
    };
    console.log(new_project);
    dispatch(editProject(project_id, new_project));
  };

  return (
    <div>
      <MaterialForm
        onSubmit={handleSubmit}
        initialValues={{
          description: "",
          glass_reference: "",
        }}
        glass_type={project?.glass}
      />
    </div>
  );
};

export default MaterialAddPage;
