import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseKiln = (kiln_id) => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect(
    [{ path: `/userdata/${uid}/kilns/${kiln_id}` }],
    [kiln_id]
  );

  const kiln = useSelector((state) => {
    console.log(kiln_id);
    return (
      kiln_id &&
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].kilns &&
      state.firebase.data.userdata[uid].kilns[kiln_id]
    );
  });

  return kiln;
};

export default useFirebaseKiln;
