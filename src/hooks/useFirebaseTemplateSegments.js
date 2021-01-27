import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseTemplateSegments = () => {
  useFirebaseConnect([{ path: `/templates/segments` }]);

  const segments = useSelector((state) => {
    return (
      state.firebase.data.templates && state.firebase.data.templates.segments
    );
  });
  return segments;
};

export default useFirebaseTemplateSegments;
