import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../actions";
import ProjectForm from "../components/ProjectForm";
import { fetchKilns } from "../actions";

const ProjectCreateScreen = (props) => {
  const dispatch = useDispatch();

  const kilns = useSelector((state) => state.kilns);
  useEffect(() => {
    dispatch(fetchKilns());
  }, [dispatch]);
  const kiln_array = Object.values(kilns);
  const first_kiln = kiln_array[0];
  if (!first_kiln) {
    return <div>Please create a kiln first</div>;
  }

  //console.log(`First Kiln: ${first_kiln}`);
  const handleSubmit = (formValues) => {
    dispatch(createProject(formValues));
  };

  return (
    <div>
      <ProjectForm
        onSubmit={handleSubmit}
        initialValues={{
          kiln: first_kiln.id,
          glass: "Bullseye",
          thickness: "6",
          stars: 2.5,
        }}
      />
    </div>
  );
};

export default ProjectCreateScreen;
