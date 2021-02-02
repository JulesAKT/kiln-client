import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseUserData = () => {
  useFirebaseConnect([{ path: `/userdata` }]);

  const userData = useSelector((state) => state.firebase.data.userdata);

  return userData;
};

export default useFirebaseUserData;
