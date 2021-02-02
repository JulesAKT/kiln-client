import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseFiring = (firing_id) => {
  const uid = useFakedUID();

  useFirebaseConnect(
    [{ path: `/userdata/${uid}/firings/${firing_id}` }],
    [firing_id]
  );

  const firing = useSelector(
    (state) =>
      firing_id &&
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].firings &&
      state.firebase.data.userdata[uid].firings[firing_id]
  );

  return firing;
};

export default useFirebaseFiring;
