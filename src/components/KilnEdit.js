import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KilnForm from "../components/KilnForm";
import { editKiln } from "../actions";
import { useFirebaseConnect } from "react-redux-firebase";
const KilnEditScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const handleSubmit = (formValues) => {
    dispatch(editKiln(id, formValues));
  };
  /*  useEffect(() => {
    dispatch(fetchKiln(id));
  }, [dispatch, id]);
  const kiln = useSelector((state) => state.kilns[id]);
  */
  const uid = useSelector((state) => state.auth.uid);

  useFirebaseConnect([{ path: `/userdata/${uid}/kilns/${id}` }]);
  //console.log(`Finding: ${id}`);
  const kiln = useSelector(
    (state) =>
      state.firebase.data.userdata &&
      state.firebase.data.userdata[uid].kilns[id]
  );

  if (!kiln) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <KilnForm onSubmit={handleSubmit} initialValues={kiln} />
    </div>
  );
};

export default KilnEditScreen;
