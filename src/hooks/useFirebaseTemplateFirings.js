import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseTemplateFirings = (glass_type) => {
  console.log("glasstype: " + glass_type);
  useFirebaseConnect(
    [{ path: `/templates/firings/${glass_type}` }],
    [glass_type]
  );

  const firings = useSelector((state) => {
    return (
      glass_type &&
      state.firebase.data.templates &&
      state.firebase.data.templates.firings &&
      state.firebase.data.templates.firings[glass_type]
    );
  });
  return firings;
};

export default useFirebaseTemplateFirings;
