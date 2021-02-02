import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseProject = (project_id) => {
  const uid = useFakedUID();
  useFirebaseConnect(
    [{ path: `/userdata/${uid}/projects/${project_id}` }],
    [project_id]
  );

  const project = useSelector(
    (state) =>
      project_id &&
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].projects &&
      state.firebase.data.userdata[uid].projects[project_id]
  );

  return project;
};

export default useFirebaseProject;
