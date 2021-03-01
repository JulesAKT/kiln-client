import React from "react";
import { useDispatch } from "react-redux";
import { createFiring } from "../actions";
import FiringForm from "./FiringForm";

const FiringCreatePage = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (formValues) => {
    const values = {
      project_id: props.match.params.id,
      order: props.match.params.order,
      ...formValues,
    };
    console.log("submitting");
    console.log(values);
    dispatch(createFiring(values));
  };

  return (
    <div>
      <FiringForm
        onSubmit={handleSubmit}
        initialValues={{
          notes: "",
          name: "",
          date: Date.now(),
        }}
      />
    </div>
  );
};

export default FiringCreatePage;
