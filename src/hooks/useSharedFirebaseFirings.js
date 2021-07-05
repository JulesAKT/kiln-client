import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useSharedFirebaseFirings = (sharing_user_id) => {
  useFirebaseConnect(
    [{ path: `/shared_userdata/${sharing_user_id}/firings` }],
    [sharing_user_id]
  );

  const firings = useSelector(
    (state) => state.firebase?.data?.shared_userdata?.[sharing_user_id]?.firings
  );

  return firings;
};

export default useSharedFirebaseFirings;
