import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseProjects = () => {
  const uid = useFakedUID();
  useFirebaseConnect([{ path: `/userdata/${uid}/inventory` }]);

  const projects = useSelector(
    (state) => state?.firebase?.data?.userdata?.[uid]?.inventory
  );
  return projects;
};

export default useFirebaseProjects;
