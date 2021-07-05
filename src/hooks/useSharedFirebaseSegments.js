import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useSharedFirebaseSegments = (sharing_user_id) => {
  useFirebaseConnect(
    [{ path: `/shared_userdata/${sharing_user_id}/segments` }],
    [sharing_user_id]
  );

  const segments = useSelector(
    (state) =>
      state.firebase?.data?.shared_userdata?.[sharing_user_id]?.segments
  );

  return segments;
};

export default useSharedFirebaseSegments;
