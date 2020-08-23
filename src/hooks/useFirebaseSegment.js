import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseSegment = (segment_id) => {
  const uid = useSelector((state) => state.firebase.auth.uid);
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
