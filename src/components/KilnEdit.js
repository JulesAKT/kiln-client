import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KilnForm from "../components/KilnForm";
import { fetchKiln, editKiln } from "../actions";

const KilnEditScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const handleSubmit = (formValues) => {
    dispatch(editKiln(id, formValues));
  };
  useEffect(() => {
    dispatch(fetchKiln(id));
  }, [dispatch, id]);
  const kiln = useSelector((state) => state.kilns[id]);
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
