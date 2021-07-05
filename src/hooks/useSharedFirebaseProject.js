import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useSharedFirebaseProject = (sharing_user_id, project_id) => {
  useFirebaseConnect(
    [{ path: `/shared_userdata/${sharing_user_id}/projects/${project_id}` }],
    [sharing_user_id, project_id]
  );

  const project = useSelector(
    (state) =>
      state.firebase?.data?.shared_userdata?.[sharing_user_id]?.projects?.[
        project_id
      ]
  );

  return project;
};

export default useSharedFirebaseProject;
