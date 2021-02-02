import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseSegments = () => {
  const uid = useFakedUID();
  useFirebaseConnect([{ path: `/userdata/${uid}/segments` }]);

  const segments = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].segments
  );
  return segments;
};

export default useFirebaseSegments;
