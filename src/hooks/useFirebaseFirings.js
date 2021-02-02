import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseFirings = () => {
  const uid = useFakedUID();

  useFirebaseConnect([{ path: `/userdata/${uid}/firings` }]);

  const firings = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].firings
  );
  return firings;
};

export default useFirebaseFirings;
