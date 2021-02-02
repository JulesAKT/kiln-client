import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseSegment = (segment_id) => {
  const uid = useFakedUID();
  useFirebaseConnect([{ path: `/userdata/${uid}/segments/${segment_id}` }]);

  const segment = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].segments[segment_id]
  );

  return segment;
};

export default useFirebaseSegment;
