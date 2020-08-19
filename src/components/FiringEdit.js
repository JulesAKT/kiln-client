import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFiring } from "../actions";
import { useFirebaseConnect } from "react-redux-firebase";
import FiringForm from "../components/FiringForm";

const FiringEditScreen = (props) => {
  //const navigation = props.navigation;
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect([{ path: `/userdata/${uid}/firings/${id}` }]);

  const handleSubmit = (formValues) => {
    dispatch(editFiring(id, formValues));
  };
  const firing = useSelector(
    ({ firebase: { data } }) =>
      data.userdata && data.userdata[uid] && data.userdata[uid].firings[id]
  );
  if (!firing) {
    return <div>Loading...</div>;
  }
  // console.log(id);
  return (
    <div>
      <FiringForm onSubmit={handleSubmit} initialValues={firing} />
    </div>
  );
};

export default FiringEditScreen;
