import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseTemplateSegments = () => {
  useFirebaseConnect([{ path: `/templates/segments` }], [glass_type]);

  const segments = useSelector((state) => {
    return (
      glass_type &&
      state.firebase.data.templates &&
      state.firebase.data.templates.segments
    );
  });
  return segments;
};

export default useFirebaseTemplateSegments;
