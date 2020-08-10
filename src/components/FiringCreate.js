import React from "react";
import { useDispatch } from "react-redux";
import { createFiring } from "../actions";
import FiringForm from "../components/FiringForm";

const FiringCreateScreen = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (formValues) => {
    dispatch(createFiring(formValues));
  };

  return (
    <div>
      <FiringForm
        onSubmit={handleSubmit}
        initialValues={{ project_id: props.route.params.project_id }}
      />
    </div>
  );
};

export default FiringCreateScreen;
