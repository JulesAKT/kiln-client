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
    const values = {
      project_id: firing.project_id,
      order: firing.order || 0,
      id: firing.id,
      favourite: firing.favourite || false,
      ...formValues,
    };
    dispatch(editFiring(id, formValues));
  };
  if (!firing) {
    return <div>Loading...</div>;
  }
  // console.log(id);
  let initialValues = {
    name: "",
    notes: "",
    date: new Date(Date.now()),
    ...firing,
  };

  return (
    <div>
      <FiringForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default FiringEditPage;
