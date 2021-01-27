import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebasePreferences = () => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect([{ path: `/userdata/${uid}/preferences` }]);

  const preferences = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid] &&
      state.firebase.data.userdata[uid].preferences
  );

  return preferences;
};

export default useFirebasePreferences;
