import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseUsers = () => {
  useFirebaseConnect([{ path: `/users` }]);

  const userData = useSelector((state) => state.firebase.data.users);

  return userData;
};

export default useFirebaseUsers;
