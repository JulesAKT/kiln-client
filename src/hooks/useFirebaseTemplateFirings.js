import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseTemplateFirings = (glassType) => {
  console.log("glasstype: " + glassType);
  useFirebaseConnect(
    [{ path: `/templates/firings/${glassType}` }],
    [glassType]
  );

  const firings = useSelector((state) => {
    return (
      glassType &&
      state.firebase.data.templates &&
      state.firebase.data.templates.firings[glassType]
    );
  });
  return firings;
};

export default useFirebaseTemplateFirings;
