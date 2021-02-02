import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseKiln = (kiln_id) => {
  const uid = useFakedUID();
  useFirebaseConnect(
    [{ path: `/userdata/${uid}/kilns/${kiln_id}` }],
    [kiln_id]
  );

  const kiln = useSelector(
    (state) =>
      kiln_id &&
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].kilns &&
      state.firebase.data.userdata[uid].kilns[kiln_id]
  );

  return kiln;
};

export default useFirebaseKiln;
