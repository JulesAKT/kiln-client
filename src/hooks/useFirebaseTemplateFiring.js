import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseTemplateFiring = (firing_id, glass_type) => {
  useFirebaseConnect(
    [{ path: `/templates/firings/${glass_type}/${firing_id}` }],
    [firing_id, glass_type]
  );
  console.log("UseFirebaseTemplateFiring");

  const firing = useSelector(
    (state) =>
      glass_type &&
      firing_id &&
      state.firebase.data.templates &&
      state.firebase.data.templates.firings &&
      state.firebase.data.templates.firings[glass_type] &&
      state.firebase.data.templates.firings[glass_type][firing_id]
  );

  return firing;
};

export default useFirebaseTemplateFiring;
