import React from "react";
import { useDispatch } from "react-redux";
import { createFiring } from "../actions";
import FiringForm from "./FiringForm";

const FiringCreatePage = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (formValues) => {
    dispatch(createFiring(formValues));
  };

  return (
    <div>
      <FiringForm
        onSubmit={handleSubmit}
        initialValues={{ project_id: props.match.params.id }}
      />
    </div>
  );
};

export default FiringCreatePage;
