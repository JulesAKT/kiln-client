import React from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../actions";
import useFirebaseProject from "../hooks/useFirebaseProject";

import MaterialForm from "./MaterialForm";

const MaterialEditPage = (props) => {
  const dispatch = useDispatch();
  const project_id = props.match.params.project_id;
  const material_id = props.match.params.material_id;
  const project = useFirebaseProject(project_id);

  const glass_type = project?.materials[material_id].glass || project?.glass;
  console.log(`MaterialEditPage - glass type = ${glass_type}`);
  const handleSubmit = (formValues) => {
    const new_project = { ...project };
    const new_material = { ...formValues, glass: glass_type };
    new_project.materials = {
      ...new_project.materials,
      [material_id]: new_material,
    };
    console.log(new_project);
    dispatch(editProject(project_id, new_project));
  };
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MaterialForm
        onSubmit={handleSubmit}
        initialValues={{
          description: project.materials[material_id].description,
          glass_reference: project.materials[material_id].glass_reference,
        }}
        glass_type={glass_type}
      />
    </div>
  );
};

export default MaterialEditPage;
