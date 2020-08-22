import React from "react";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import useFirebaseKilns from "../hooks/useFirebaseKilns";
import ProjectForm from "./ProjectForm";
import { editProject } from "../actions";

const ProjectEditPage = (props) => {
  const dispatch = useDispatch();
  const kilns = useFirebaseKilns();
  const id = props.match.params.id;
  const uid = useSelector((state) => state.firebase.auth.uid);

  useFirebaseConnect([{ path: `/userdata/${uid}/projects/${id}` }]);

  const project = useSelector(
    ({ firebase: { data } }) =>
      data.userdata && data.userdata[uid] && data.userdata[uid].projects[id]
  );

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
