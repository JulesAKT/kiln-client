import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ProjectForm from "../components/ProjectForm";
import { fetchKilns, editProject } from "../actions";

const ProjectEditScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const kilns = useSelector((state) => state.kilns);
  const project = useSelector((state) => state.projects[id]);
  useEffect(() => {
    dispatch(fetchKilns());
  }, [dispatch]);
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

export default ProjectEditScreen;
