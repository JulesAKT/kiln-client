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
  if (!project) {
    return <div>Loading...</div>;
  }
  const handleSubmit = (formValues) => {
    dispatch(
      editProject(id, {
        photos: project.photos || [],
        ...formValues,
      })
    );
  };
  const initialValues = {
    name: "",
    width: "",
    depth: "",
    thickness: "",
    notes: "",
    glass: "Bullseye",
    thickness: "6",
    stars: 2.5,
    notes: "",
    length_unit: "mm",

    ...project,
  };
  return (
    <div>
      <ProjectForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default ProjectEditPage;
