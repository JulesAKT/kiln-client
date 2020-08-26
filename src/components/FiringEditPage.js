import React from "react";
import { useDispatch } from "react-redux";
import { editFiring } from "../actions";
import useFirebaseFiring from "../hooks/useFirebaseFiring";
import FiringForm from "./FiringForm";

const FiringEditPage = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const firing = useFirebaseFiring(id);

  const handleSubmit = (formValues) => {
    dispatch(editFiring(id, formValues));
  };
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

export default FiringEditPage;
