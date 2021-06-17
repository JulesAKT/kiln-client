import { useTypedSelector } from "../reducers";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseKiln = (kiln_id: string) => {
  const uid = useFakedUID();
  useFirebaseConnect({ path: `/userdata/${uid}/kilns/${kiln_id}` });

  const kiln = useTypedSelector(
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
