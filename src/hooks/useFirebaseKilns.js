import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useFakedUID } from "./useFakeUID";

const useFirebaseKilns = () => {
  const uid = useFakedUID();
  useFirebaseConnect([{ path: `/userdata/${uid}/kilns` }]);

  const kilns = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].kilns
  );
  return kilns;
};

export default useFirebaseKilns;
