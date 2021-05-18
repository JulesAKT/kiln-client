import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

const useFirebaseGlassData = (glasstype) => {
  useFirebaseConnect([{ path: `/glassdata/${glasstype}` }]);

  const glass_data = useSelector((state) => {
    return (
      state.firebase.data.glassdata && state.firebase.data.glassdata[glasstype]
    );
  });
  return glass_data;
};

export default useFirebaseGlassData;