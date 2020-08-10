import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiring, editFiring } from "../actions";
import FiringForm from "../components/FiringForm";

const FiringEditScreen = (props) => {
  //const navigation = props.navigation;
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const handleSubmit = (formValues) => {
    dispatch(editFiring(id, formValues));
  };
  useEffect(() => {
    dispatch(fetchFiring(id));
  }, [dispatch, id]);
  const firing = useSelector((state) => state.firings[id]);
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
