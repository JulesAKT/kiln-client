import React from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../actions";
import ProjectForm from "./ProjectForm";

import useFirebaseKilns from "../hooks/useFirebaseKilns";

const ProjectCreatePage = (props) => {
  const dispatch = useDispatch();

  const kilns = useFirebaseKilns();
  const first_kiln = kilns && Object.values(kilns)[0];

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

export default ProjectCreatePage;
