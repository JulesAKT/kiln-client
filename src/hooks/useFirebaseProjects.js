import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseProjects = () => {
  const uid = useFakedUID();
  useFirebaseConnect([{ path: `/userdata/${uid}/projects` }]);

  const projects = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].projects
  );
  return projects;
};

export default useFirebaseProjects;
