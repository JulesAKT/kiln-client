import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseFiring = (firing_id) => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect([{ path: `/userdata/${uid}/firings/${firing_id}` }]);

  const firing = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].firings[firing_id]
  );

  return firing;
};

export default useFirebaseFiring;
